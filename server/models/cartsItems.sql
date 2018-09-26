
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TABLE IF NOT EXISTS carts_items (
  cart_id uuid NOT NULL DEFAULT uuid_generate_v4() REFERENCES carts(id) ON UPDATE CASCADE ON DELETE CASCADE,
  item_id uuid NOT NULL DEFAULT uuid_generate_v4() REFERENCES items(id) ON UPDATE CASCADE,
  item_quantity INTEGER NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT carts_items_pkey PRIMARY KEY (cart_id, item_id)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON carts_items
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
