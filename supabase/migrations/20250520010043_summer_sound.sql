/*
  # Add agent messaging system

  1. New Tables
    - `agent_messages`
      - `id` (uuid, primary key)
      - `agent_id` (uuid, references agents)
      - `user_id` (uuid, references users)
      - `listing_id` (uuid, references listings)
      - `message_text` (text)
      - `is_read` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on agent_messages table
    - Add policies for:
      - Agents can read/write messages for their listings
      - Users can read/write messages for listings they're interested in
      - Hosts can read messages related to their listings

  3. Changes
    - Add messaging capabilities between agents and users
    - Add relationship to listings for context
*/

-- Create agent_messages table
CREATE TABLE IF NOT EXISTS agent_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid NOT NULL REFERENCES agents(id),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  listing_id uuid NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  message_text text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_message CHECK (
    agent_id <> user_id
    AND length(trim(message_text)) > 0
  )
);

-- Enable RLS
ALTER TABLE agent_messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Agents can read their messages"
  ON agent_messages
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = agent_id
    OR EXISTS (
      SELECT 1 FROM listings
      WHERE listings.id = agent_messages.listing_id
      AND listings.host_id = auth.uid()
    )
  );

CREATE POLICY "Users can read their messages with agents"
  ON agent_messages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Agents can send messages"
  ON agent_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = agent_id
    AND EXISTS (
      SELECT 1 FROM listings
      WHERE listings.id = agent_messages.listing_id
      AND listings.agent_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages to agents"
  ON agent_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM listings
      WHERE listings.id = agent_messages.listing_id
      AND listings.agent_id = agent_messages.agent_id
    )
  );

CREATE POLICY "Recipients can mark messages as read"
  ON agent_messages
  FOR UPDATE
  TO authenticated
  USING (
    (auth.uid() = agent_id OR auth.uid() = user_id)
    AND is_read = true
  )
  WITH CHECK (
    (auth.uid() = agent_id OR auth.uid() = user_id)
    AND is_read = true
  );

-- Create trigger for updating updated_at
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_agent_messages_updated_at'
  ) THEN
    CREATE TRIGGER update_agent_messages_updated_at
      BEFORE UPDATE ON agent_messages
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at();
  END IF;
END $$;