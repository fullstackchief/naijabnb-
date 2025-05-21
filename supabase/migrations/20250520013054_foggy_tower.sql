/*
  # Add support tables
  
  1. New Tables
    - notifications: For user notifications
    - payment_methods: For storing user payment methods
    - transactions: For tracking booking payments
    - support_tickets: For user support requests
    - support_messages: For support ticket messages

  2. Security
    - Enable RLS on all tables
    - Add policies for user access
    - Add policies for admin access where needed

  3. Functions & Triggers
    - Add trigger for updating support ticket timestamps
    - Add function to ensure single default payment method
*/

-- Notifications table
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('booking', 'message', 'review', 'system')),
  title text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications"
  ON notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can mark their notifications as read"
  ON notifications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Payment methods table
CREATE TABLE payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('card', 'bank_account')),
  last_four text NOT NULL CHECK (length(last_four) = 4),
  expiry_month integer CHECK (expiry_month BETWEEN 1 AND 12),
  expiry_year integer CHECK (expiry_year >= EXTRACT(YEAR FROM CURRENT_DATE)),
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their payment methods"
  ON payment_methods
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Transactions table
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
  amount integer NOT NULL CHECK (amount > 0),
  currency text NOT NULL DEFAULT 'NGN',
  status text NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method_id uuid REFERENCES payment_methods(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM bookings
    WHERE bookings.id = transactions.booking_id
    AND (bookings.user_id = auth.uid() OR EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = bookings.property_id
      AND properties.host_id = auth.uid()
    ))
  ));

-- Support tickets table
CREATE TABLE support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject text NOT NULL,
  description text NOT NULL,
  status text NOT NULL CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')) DEFAULT 'open',
  priority text NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their support tickets"
  ON support_tickets
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all support tickets"
  ON support_tickets
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.user_id = auth.uid()
  ));

-- Support messages table
CREATE TABLE support_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid REFERENCES support_tickets(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message text NOT NULL CHECK (length(TRIM(message)) > 0),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages for their tickets"
  ON support_messages
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM support_tickets
      WHERE support_tickets.id = ticket_id
      AND support_tickets.user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages for their tickets"
  ON support_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM support_tickets
      WHERE support_tickets.id = ticket_id
      AND (
        support_tickets.user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM admin_users
          WHERE admin_users.user_id = auth.uid()
        )
      )
    )
  );

-- Trigger to update support_tickets.updated_at
CREATE OR REPLACE FUNCTION update_support_ticket_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_support_ticket_timestamp
  BEFORE UPDATE ON support_tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_support_ticket_updated_at();

-- Function to ensure only one default payment method per user
CREATE OR REPLACE FUNCTION ensure_single_default_payment_method()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_default THEN
    UPDATE payment_methods
    SET is_default = false
    WHERE user_id = NEW.user_id
    AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ensure_single_default_payment_method_trigger
  BEFORE INSERT OR UPDATE ON payment_methods
  FOR EACH ROW
  EXECUTE FUNCTION ensure_single_default_payment_method();