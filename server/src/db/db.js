import { client } from './dbClient.js';

class Database {
    async createTables() {
        try {
            const createInventoryTable = `
                CREATE TABLE IF NOT EXISTS inventory (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    category VARCHAR(255) NOT NULL,
                    quantity INTEGER NOT NULL,
                    price_per_unit DECIMAL(10, 2) NOT NULL,
                    cost_per_unit DECIMAL(10, 2) NOT NULL,
                    expiry_date DATE,
                    date_received DATE
                );
            `;

            const createUsersTable = `
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    username VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    role VARCHAR(50) NOT NULL
                );
            `;
            await client.connect();
            await client.query(createInventoryTable);
            await client.query(createUsersTable);
            console.log('Tables created successfully');
            await client.end();
        } catch (error) {
            console.error('Error creating tables:', error);
            throw error;
        }
    }
}

export default new Database();