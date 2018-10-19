CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS food_items (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price numeric NOT NULL,
  img_url TEXT NOT NULL,
  active  BOOLEAN NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON food_items
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

