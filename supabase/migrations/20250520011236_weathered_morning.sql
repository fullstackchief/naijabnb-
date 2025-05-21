/*
  # Messages Table Migration

  1. New Tables
    - `messages` table for storing messages between users and hosts
      - `id` (uuid, primary key)
      - `sender_id` (uuid, references auth.users)
      - `receiver_id` (uuid, references auth.users)
      - `booking_id` (uuid, references bookings)
      - `message_text` (text)
      - `is_read` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for message access and management
    - Ensure users can only read their own messages
    - Allow users to send messages for their bookings
    - Allow marking messages as read

  3. Constraints
    - Sender and receiver must be different users
    - Message text cannot be empty
*/

-- Create messages table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'messages'
  ) THEN
    CREATE TABLE messages (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      sender_id uuid NOT NULL REFERENCES auth.users(id),
      receiver_id uuid NOT NULL REFERENCES auth.users(id),
      booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
      message_text text NOT NULL,
      is_read boolean DEFAULT false,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now(),
      CONSTRAINT valid_message CHECK (
        sender_id <> receiver_id
        AND length(trim(message_text)) > 0
      )
    );

    -- Enable RLS
    ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

    -- Create policies
    CREATE POLICY "Users can read their own messages"
      ON messages
      FOR SELECT
      TO authenticated
      USING (
        auth.uid() = sender_id
        OR auth.uid() = receiver_id
      );

    CREATE POLICY "Users can send messages for their bookings"
      ON messages
      FOR INSERT
      TO authenticated
      WITH CHECK (
        auth.uid() = sender_id
        AND EXISTS (
          SELECT 1 FROM bookings b
          LEFT JOIN listings p ON b.property_id = p.id
          WHERE b.id = messages.booking_id
          AND (b.user_id = auth.uid() OR p.host_id = auth.uid())
        )
      );

    CREATE POLICY "Users can mark messages as read"
      ON messages
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = receiver_id)
      WITH CHECK (
        auth.uid() = receiver_id
        AND is_read = true
      );

    -- Create trigger for updating updated_at
    CREATE TRIGGER update_messages_updated_at
      BEFORE UPDATE ON messages
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at();
  END IF;
END $$;