import { pool } from '../dbClient.js';

class UserDB {
    async loginUser(userName) {
        try {
            const res = await pool.query(
                'SELECT id, name, role, password FROM users WHERE username = $1',
                [userName]
            )
            return res.rows[0];
        }
        catch (err) {
            console.error('UserDB: Failed to query select for user', userName, err);
            throw new Error('UserDB: Failed to select for user login', { cause: err });
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
            console.error('UserDB: Failed to query insert for user', userName, err);
            throw new Error('UserDB: Failed to insert new user', { cause: err });
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
            console.error('UserDB: failed to query delete for user id', id, err);
            throw new Error('UserDB: Failed to delete user', { cause: err });
        }
    }
    async getUsers() {
        try {
            const res = await pool.query('SELECT id, name, username, role FROM users');
            return res.rows;
        }
        catch (err) {
            console.error('UserDB: failed to query select for all users', err);
            throw new Error('UserDB: Failed to select for all users', { cause: err });
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
            console.error('UserDB: failed to query select for user id', id, err);
            throw new Error('UserDB: Failed to select for user', { cause: err });
        }
    } 
}

export default new UserDB();