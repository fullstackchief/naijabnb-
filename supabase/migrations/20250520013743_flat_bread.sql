/*
  # Payment System Improvements

  1. New Tables
    - `refund_policies` - Stores refund policy rules
    - `payment_disputes` - Handles payment disputes
    - `payment_receipts` - Stores payment receipt information
  
  2. Changes
    - Add payment_status to bookings table
    - Add refund_policy_id to bookings table
    
  3. Security
    - Enable RLS on all new tables
    - Add appropriate policies for users and admins
*/

-- Add payment status to bookings
ALTER TABLE bookings 
ADD COLUMN payment_status text NOT NULL 
CHECK (payment_status IN ('pending', 'authorized', 'captured', 'failed', 'refunded', 'partially_refunded'))
DEFAULT 'pending';

-- Refund policies table
CREATE TABLE refund_policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  cancellation_deadline_hours integer NOT NULL,
  refund_percentage integer NOT NULL CHECK (refund_percentage BETWEEN 0 AND 100),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE refund_policies ENABLE ROW LEVEL SECURITY;

-- Add refund policy reference to bookings
ALTER TABLE bookings 
ADD COLUMN refund_policy_id uuid REFERENCES refund_policies(id);

-- Payment disputes table
CREATE TABLE payment_disputes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
  transaction_id uuid REFERENCES transactions(id) NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  reason text NOT NULL,
  status text NOT NULL CHECK (status IN ('opened', 'under_review', 'resolved', 'rejected')) DEFAULT 'opened',
  resolution_notes text,
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE payment_disputes ENABLE ROW LEVEL SECURITY;

-- Payment receipts table
CREATE TABLE payment_receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id uuid REFERENCES transactions(id) NOT NULL,
  booking_id uuid REFERENCES bookings(id) NOT NULL,
  receipt_number text NOT NULL,
  subtotal integer NOT NULL CHECK (subtotal > 0),
  taxes integer NOT NULL DEFAULT 0,
  fees integer NOT NULL DEFAULT 0,
  total integer NOT NULL CHECK (total > 0),
  currency text NOT NULL DEFAULT 'NGN',
  issued_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payment_receipts ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Refund policies
CREATE POLICY "Anyone can view active refund policies"
  ON refund_policies
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage refund policies"
  ON refund_policies
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.user_id = auth.uid()
  ));

-- Payment disputes
CREATE POLICY "Users can view their disputes"
  ON payment_disputes
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM bookings b
      JOIN properties p ON b.property_id = p.id
      WHERE b.id = payment_disputes.booking_id
      AND p.host_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create disputes for their bookings"
  ON payment_disputes
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = booking_id
      AND bookings.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage disputes"
  ON payment_disputes
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.user_id = auth.uid()
  ));

-- Payment receipts
CREATE POLICY "Users can view their receipts"
  ON payment_receipts
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM bookings
    WHERE bookings.id = payment_receipts.booking_id
    AND (
      bookings.user_id = auth.uid() OR
      EXISTS (
        SELECT 1 FROM properties
        WHERE properties.id = bookings.property_id
        AND properties.host_id = auth.uid()
      )
    )
  ));

CREATE POLICY "System can create receipts"
  ON payment_receipts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Triggers
CREATE OR REPLACE FUNCTION update_dispute_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_payment_dispute_timestamp
  BEFORE UPDATE ON payment_disputes
  FOR EACH ROW
  EXECUTE FUNCTION update_dispute_updated_at();

-- Insert default refund policies
INSERT INTO refund_policies (name, description, cancellation_deadline_hours, refund_percentage) VALUES
  ('Flexible', 'Full refund if cancelled 24 hours before check-in', 24, 100),
  ('Moderate', 'Full refund if cancelled 5 days before check-in', 120, 100),
  ('Strict', 'Full refund if cancelled 7 days before check-in, 50% refund afterwards', 168, 50);