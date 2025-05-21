/*
  # Add Listing Amenities Support

  1. New Tables
    - `listing_amenities` - Amenities for property listings
      - `id` (uuid, primary key)
      - `listing_id` (uuid, references listings)
      - `name` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `listing_amenities` table
    - Add policies for:
      - Public read access
      - Host management of own listing amenities
      - Agent management of represented listing amenities
*/

-- Create listing_amenities table
CREATE TABLE IF NOT EXISTS listing_amenities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE listing_amenities ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view listing amenities"
  ON listing_amenities
  FOR SELECT
  USING (true);

CREATE POLICY "Hosts can manage their listing amenities"
  ON listing_amenities
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM listings
    WHERE listings.id = listing_amenities.listing_id
    AND listings.host_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM listings
    WHERE listings.id = listing_amenities.listing_id
    AND listings.host_id = auth.uid()
  ));

CREATE POLICY "Agents can manage listing amenities they represent"
  ON listing_amenities
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM listings
    WHERE listings.id = listing_amenities.listing_id
    AND listings.agent_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM listings
    WHERE listings.id = listing_amenities.listing_id
    AND listings.agent_id = auth.uid()
  ));