import { pool } from '../dbClient.js';

class UserDB {
    async loginUser(userName) {
        try {
            const res = await pool.query(
                'SELECT id, name, role, password FROM users WHERE username = $1',
                [userName]
            )
            if (res.rows.length === 0) {
                throw new Error('User not found');
            }
            return res.rows[0];
        }
        catch (err) {
            console.error('Error logging in user:', err);
            throw err;
        }
    }
    async addUser(name, userName, password, role) {
        try {
            const res = await pool.query(
                'INSERT INTO users (name, username, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
                [name, userName, password, role]
            )
            return res.rows[0];
        }
        catch (err) {
            console.error('Error adding user:', err);
            throw err;
        }
    }
    async deleteUser(id) {
        try {
            const res = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *',
                [id]
            )
            return res.rows[0];
        }
        catch (err) {
            console.error('Error deleting user by ID:', err);
            throw err;
        }
    }
    async getUsers() {
        try {
            const res = await pool.query('SELECT id, name, username, role FROM users');
            return res.rows;
        }
        catch (err) {
            console.error('Error fetching users:', err);
            throw err;
        }
    }
    async getCurrentUser(id) {
        try {
            const res = await pool.query('SELECT id, name, role FROM users WHERE id = $1',
                [id]
            )
            return res.rows[0]
        }
        catch (err) {
            console.error('Error fetching specific user:', err);
            throw err;
        }
    } 
}

export default new UserDB();