import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const db = (text, params, callback) => pool.query(text, params, callback);
export default db;
