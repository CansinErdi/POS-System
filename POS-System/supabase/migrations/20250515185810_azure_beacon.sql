/*
  # Initial Schema Setup

  1. New Tables
    - `ingredients`
      - `id` (uuid, primary key)
      - `name` (text)
      - `quantity` (decimal)
      - `unit` (text)
      - `threshold` (decimal)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `menu_items`
      - `id` (uuid, primary key)
      - `name` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `menu_item_ingredients`
      - `id` (uuid, primary key)
      - `menu_item_id` (uuid, foreign key)
      - `ingredient_id` (uuid, foreign key)
      - `quantity` (decimal)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create ingredients table
CREATE TABLE IF NOT EXISTS ingredients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  quantity decimal NOT NULL CHECK (quantity >= 0),
  unit text NOT NULL,
  threshold decimal NOT NULL CHECK (threshold >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create menu_item_ingredients table
CREATE TABLE IF NOT EXISTS menu_item_ingredients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id uuid REFERENCES menu_items(id) ON DELETE CASCADE,
  ingredient_id uuid REFERENCES ingredients(id) ON DELETE CASCADE,
  quantity decimal NOT NULL CHECK (quantity > 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_item_ingredients ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users full access to ingredients"
  ON ingredients
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to menu_items"
  ON menu_items
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to menu_item_ingredients"
  ON menu_item_ingredients
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_ingredients_updated_at
  BEFORE UPDATE ON ingredients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON menu_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_item_ingredients_updated_at
  BEFORE UPDATE ON menu_item_ingredients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();