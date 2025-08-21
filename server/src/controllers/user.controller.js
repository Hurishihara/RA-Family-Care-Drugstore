import userService from "../services/user.service.js";

class UserController {
    async addUser(req, res) {
        const currentUser = req.user;
        if (!currentUser || currentUser.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        try {
            const { name, userName, password, role } = req.body
            const newUser = await userService.addUser(name, userName, password, role);
            res.status(201).json({ message: 'User added successfully', user: newUser });
        }
        catch (err) {
            console.error('Error adding user:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
        
    }
    async deleteUser(req, res) {
        const currentUser = req.user;
        if (!currentUser || currentUser.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        try {
            const { id } = req.params;
            const deletedUser = await userService.deleteUser(id);
            return res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
        }
        catch (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getUsers(req, res) {
        const currentUser = req.user;
        if (!currentUser || currentUser.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        try {
            const users = await userService.getUsers();
            return res.status(200).json(users);
        }
        catch (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}


export default new UserController();
