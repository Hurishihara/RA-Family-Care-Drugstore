import { hashPassword } from '../utils/bcrypt.js';
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
                DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
                        CREATE TYPE user_role AS ENUM ('Admin', 'Staff');
                    END IF;
                END$$;
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    username VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    role user_role NOT NULL
                );
            `;

            const createOrdersTable = `
                DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_type') THEN
                        CREATE TYPE payment_type AS ENUM ('Cash', 'GCash');
                    END IF;
                END$$;
                CREATE TABLE IF NOT EXISTS orders (
                    id SERIAL PRIMARY KEY,
                    customer_name VARCHAR(100) NOT NULL,
                    total DECIMAL(10, 2) NOT NULL,
                    items JSONB NOT NULL,
                    order_date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
                    payment_method payment_type NOT NULL,
                    order_representative VARCHAR(100) NOT NULL
                    );`

            const insertAdminAccount = `
                INSERT INTO users (name, username, password, role) VALUES ($1, $2, $3, $4) ON CONFLICT (username) DO NOTHING
            `;
            const insertStaffAccount = `
                INSERT INTO users (name, username, password, role) VALUES ($1, $2, $3, $4) ON CONFLICT (username) DO NOTHING
            `;
    
            await client.connect();
            await client.query(createInventoryTable);
            await client.query(createUsersTable);
            await client.query(createOrdersTable);

            
            await client.query(insertAdminAccount, [adminAccount.name, adminAccount.userName, await hashPassword(adminAccount.password), adminAccount.role]);
            await client.query(insertStaffAccount, [staffAccount.name, staffAccount.userName, await hashPassword(staffAccount.password), staffAccount.role]);

            console.log('Tables created successfully & data inserted successfully');
            await client.end();
        } catch (error) {
            console.error('Error creating tables:', error);
            throw error;
        }
    }
}

export default new Database();