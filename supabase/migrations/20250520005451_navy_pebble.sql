/*
  # Create agents table and policies

  1. New Tables
    - `agents`
      - `id` (uuid, primary key, references auth.users)
      - `status` (text, default 'pending')
      - `commission_rate` (numeric, default 10)
      - `bio` (text)
      - `phone` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `agents` table
    - Add policies for:
      - Viewing own profile
      - Requesting to become an agent
      - Updating own profile
      - Admin management
*/

-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  commission_rate numeric NOT NULL DEFAULT 10 CHECK (commission_rate > 0 AND commission_rate <= 100),
  bio text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_phone CHECK (phone IS NULL OR length(phone) >= 10)
);

-- Enable RLS
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Agents can view their own profile"
  ON agents
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can request to become agents"
  ON agents
  FOR INSERT
  TO authenticated
  WITH CHECK (
    id = auth.uid() AND
    status = 'pending'
  );

CREATE POLICY "Agents can update their own profile"
  ON agents
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid() AND
    (
      CASE 
        WHEN status IS NOT NULL THEN status = (SELECT status FROM agents WHERE id = auth.uid())
        ELSE true
      END
    ) AND
    (
      CASE 
        WHEN commission_rate IS NOT NULL THEN commission_rate = (SELECT commission_rate FROM agents WHERE id = auth.uid())
        ELSE true
      END
    )
  );

CREATE POLICY "Admins can manage agents"
  ON agents
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- Create trigger for updating updated_at
CREATE TRIGGER update_agents_updated_at
  BEFORE UPDATE ON agents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();