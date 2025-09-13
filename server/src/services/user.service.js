import userDB from '../db/models/user.js'
import { hashPassword } from '../utils/bcrypt.js';

class UserService {
    async addUser(name, userName, password, role) {
        try {
            const hashedPassword = await hashPassword(password);
            const newUser = await userDB.addUser(name, userName, hashedPassword, role);
            return newUser;
        }
        catch (err) {
            console.error('UserService: Error adding user:', err);
            throw err;
        }
    }
    async deleteUser(id) {
        try {
            const deletedUser = await userDB.deleteUser(id);
            if (!deletedUser) {
                throw new Error('User not found');
            }
            return deletedUser;
        }
        catch (err) {
            console.error('UserService: Error deleting user:', err);
            throw err;
        }
    }
    async getUsers() {
        try {
            const users = await userDB.getUsers();
            return users;
        }
        catch (err) {
            console.error('UserService: Error fetching users:', err);
            throw err;
        }
    }
}



export default new UserService();