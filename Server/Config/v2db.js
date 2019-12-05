import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString,
});

pool.on('connect', () => {
    console.log('Database connected');
});

const createTables = () => {
    const usersTable = `CREATE TABLE IF NOT EXISTS
        users(
            id SERIAL PRIMARY KEY,
            firstname VARCHAR(40) NOT NULL,
            lastname VARCHAR(40) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            phone VARCHAR(12) UNIQUE,
            password VARCHAR(100) NOT NULL,
            type VARCHAR(10) NOT NULL
        )`;
    const recordsTable = `CREATE TABLE IF NOT EXISTS
        incidents(
            id SERIAL PRIMARY KEY,
            title VARCHAR(50) NOT NULL,
            date TIMESTAMP NOT NULL,
            comment VARCHAR(200) NOT NULL,
            status VARCHAR(20),
            location VARCHAR(50) NOT NULL,
            type VARCHAR(20) NOT NULL,
            author SERIAL CONSTRAINT author REFERENCES users (id) ON DELETE CASCADE
        )`;
        pool.query(`${usersTable}; ${recordsTable}`);
};

const dropTables = () => {
    const allTables = 'DROP TABLE IF EXISTS incidents; DROP TABLE IF EXISTS users';
    pool.query(`${allTables}`);
};

pool.on('remove', () => {
    console.log('Client removed');
});

export { pool, createTables, dropTables };

require('make-runnable');
