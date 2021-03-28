import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const dbString = { connectionString: process.env.DB_URL };
const pool = new Pool(dbString);

export default pool;
