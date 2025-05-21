/*
  # Fix profiles table structure

  1. Changes
    - Add missing columns to profiles table
    - Add proper constraints and defaults
    - Update RLS policies

  2. Security
    - Maintain existing RLS policies
    - Ensure proper access control
*/

-- Add missing columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS full_name text,
ADD COLUMN IF NOT EXISTS user_type text DEFAULT 'guest'::text,
ADD COLUMN IF NOT EXISTS avatar_url text;

-- Add check constraint for user_type
ALTER TABLE profiles
ADD CONSTRAINT valid_user_type 
CHECK (user_type IN ('guest', 'host', 'agent'));

-- Update RLS policies to include new columns
CREATE POLICY IF NOT EXISTS "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can insert their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);