import userDB from '../db/models/user.js'

class UserService {
    async addUser(name, userName, password, role) {
        try {
            const newUser = await userDB.addUser(name, userName, password, role);
            return newUser;
        }
        catch (err) {
            console.error('Error adding user:', err);
            throw err;
        }
    }
    async deleteUser(id) {
        try {
            const deletedUser = await userDB.deleteUser(id);
            return deletedUser;
        }
        catch (err) {
            console.error('Error deleting user:', err);
            throw err;
        }
    }
    async getUsers() {
        try {
            const users = await userDB.getUsers();
            return users;
        }
        catch (err) {
            console.error('Error fetching users:', err);
            throw err;
        }
    }
}



export default new UserService();