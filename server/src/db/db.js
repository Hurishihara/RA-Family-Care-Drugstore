import { client } from './dbClient.js';

class Database {
    async createTables() {
        
        const adminAccount = {
            name: 'Stefanie Lacap',
            userName: 'stefanie.lacap',
            password: 'lacapfamily',
            role: 'Admin'
        }

        const staffAccount = {
            name: 'Marianne Lacap',
            userName: 'marianne.lacap',
            password: 'lacapfamily',
            role: 'Staff'
        };

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
                DROP TYPE user_role;
                CREATE TYPE user_role AS ENUM ('Admin', 'Staff');
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    username VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    role user_role NOT NULL
                );
            `;
            const insertAdminAccount = `
                INSERT INTO users (name, username, password, role) VALUES ($1, $2, $3, $4)
            `;
            const insertStaffAccount = `
                INSERT INTO users (name, username, password, role) VALUES ($1, $2, $3, $4)
            `;
            await client.connect();
            await client.query(createInventoryTable);
            await client.query(createUsersTable);
            await client.query(insertAdminAccount, [adminAccount.name, adminAccount.userName, adminAccount.password, adminAccount.role]);
            await client.query(insertStaffAccount, [staffAccount.name, staffAccount.userName, staffAccount.password, staffAccount.role]);
            console.log('Tables created successfully');
            await client.end();
        } catch (error) {
            console.error('Error creating tables:', error);
            throw error;
        }
    }
}

export default new Database();