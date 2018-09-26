CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS carts (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  total_price numeric NOT NULL,
  total_quantity INTEGER NOT NULL,
  paid_for BOOLEAN NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON carts
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


