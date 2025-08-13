import { pool } from '../dbClient.js';

class UserDB {
    async addUser({ username, password, role }) {
        try {
            const res = await pool.query(
                'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
                [username, password, role]
            )
            return res.rows[0];
        }
        catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    }
    async deleteUserById(id) {
        try {
            const res = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *',
                [id]
            )
            return res.rows[0];
        }
        catch (error) {
            console.error('Error deleting user by ID:', error);
            throw error;
        }
    }
}

export default new UserDB();