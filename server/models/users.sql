\c food_direct

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE role AS ENUM ('superadmin','admin', 'user');

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE users (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL, 
  email varchar(255) NOT NULL UNIQUE,
  phoneNumber varchar(255),
  Address TEXT,
  role role DEFAULT 'user',
  password  VARCHAR(255) NOT NULL,  
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();