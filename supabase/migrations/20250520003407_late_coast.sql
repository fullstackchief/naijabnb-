/*
  # Create listings schema

  1. New Tables
    - `listings`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text, nullable)
      - `address` (text)
      - `city` (text)
      - `state` (text)
      - `price_per_night` (integer)
      - `bedrooms` (integer)
      - `bathrooms` (integer)
      - `max_guests` (integer)
      - `host_id` (uuid)
      - `agent_id` (uuid, nullable)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `listings` table
    - Add policies for:
      - Public read access to published listings
      - Host management of their own listings
      - Agent management of listings they represent

  3. Triggers
    - Add updated_at trigger
*/

-- Create auth schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS auth;

-- Create auth.users table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'auth' AND table_name = 'users') THEN
    CREATE TABLE auth.users (
      id uuid PRIMARY KEY,
      email text UNIQUE,
      created_at timestamptz DEFAULT now()
    );
  END IF;
END $$;

-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  price_per_night integer NOT NULL CHECK (price_per_night > 0),
  bedrooms integer NOT NULL DEFAULT 1,
  bathrooms integer NOT NULL DEFAULT 1,
  max_guests integer NOT NULL DEFAULT 1,
  host_id uuid NOT NULL REFERENCES auth.users(id),
  agent_id uuid REFERENCES auth.users(id),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read published listings"
  ON listings
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Hosts can manage their own listings"
  ON listings
  TO authenticated
  USING (host_id = auth.uid())
  WITH CHECK (host_id = auth.uid());

CREATE POLICY "Agents can manage listings they represent"
  ON listings
  TO authenticated
  USING (agent_id = auth.uid())
  WITH CHECK (agent_id = auth.uid());

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_listings_updated_at
  BEFORE UPDATE ON listings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();