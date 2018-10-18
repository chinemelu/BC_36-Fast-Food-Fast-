import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: process.env.DATABASE_URL,
  test: process.env.DATABASE_TEST_URL,
  production: process.env.DATABASE_URL
};

export default config;
