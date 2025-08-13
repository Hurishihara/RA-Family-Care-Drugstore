import 'dotenv/config';
import pg from 'pg';
import { Pool, Client } from 'pg';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString,
})

const client = new Client({
    connectionString,
})

export { pool, client };