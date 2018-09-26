
CREATE TYPE status AS ENUM ('new','processing','cancelled', 'complete');

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS orders (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  order_status status DEFAULT 'new',
  cart_id uuid NOT NULL DEFAULT uuid_generate_v4() REFERENCES carts(id) ON UPDATE CASCADE ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT uuid_generate_v4() REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


