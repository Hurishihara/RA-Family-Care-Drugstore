
class UserController {
    async addUser(req, res) {
        const user = req.body;
        console.log(`Adding user: ${user}`);
    }
    async deleteUser(req, res) {
        const { id } = req.params;
        console.log(`Deleting user with ID: ${id}`);
    }
}

// This is a placeholder for the UserController class.

export default new UserController();
