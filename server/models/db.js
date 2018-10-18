import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const db = (text, params, callback) => pool.query(text, params, callback);
export default db;
