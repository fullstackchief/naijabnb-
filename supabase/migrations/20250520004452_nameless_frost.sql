/*
  # Add Listing Images Support

  1. New Tables
    - `listing_images` - Images for property listings
      - `id` (uuid, primary key)
      - `listing_id` (uuid, references listings)
      - `url` (text)
      - `position` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `listing_images` table
    - Add policies for:
      - Public read access
      - Host management of own listing images
      - Agent management of represented listing images
*/

-- Create listing_images table
CREATE TABLE IF NOT EXISTS listing_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  url text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE listing_images ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view listing images"
  ON listing_images
  FOR SELECT
  USING (true);

CREATE POLICY "Hosts can manage their listing images"
  ON listing_images
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM listings
    WHERE listings.id = listing_images.listing_id
    AND listings.host_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM listings
    WHERE listings.id = listing_images.listing_id
    AND listings.host_id = auth.uid()
  ));

CREATE POLICY "Agents can manage listing images they represent"
  ON listing_images
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM listings
    WHERE listings.id = listing_images.listing_id
    AND listings.agent_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM listings
    WHERE listings.id = listing_images.listing_id
    AND listings.agent_id = auth.uid()
  ));