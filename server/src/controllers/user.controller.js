import { StatusCodes } from "http-status-codes";
import userService from "../services/user.service.js";
import CustomError from "../utils/error.js";

class UserController {
    async addUser(req, res, next) {
        try {
            const currentUser = req.user;
            if (currentUser.role !== 'admin') {
                return next(new CustomError('Admin privileges required', 'You do not have permission to add users', StatusCodes.FORBIDDEN));
            }
            const { name, userName, password, role } = req.body
            const newUser = await userService.addUser(name, userName, password, role);
            res.status(201).json({ message: 'User added successfully', user: newUser });
        }
        catch (err) {
            return next(new CustomError('Failed to add user', 'Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR));
        }
        
    }
    async deleteUser(req, res, next) {
        try {
            const currentUser = req.user;
            const { id } = req.params;
            if (currentUser.role !== 'admin') {
                return next(new CustomError('Admin privileges required', 'You do not have permission to delete users', StatusCodes.FORBIDDEN));
            }
            const deletedUser = await userService.deleteUser(id);
            return res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
        }
        catch (err) {
           return next(new CustomError('Failed to delete user', 'Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR));
        }
    }
    async getUsers(req, res, next) {
        try {
            const currentUser = req.user;
            if (currentUser.role !== 'admin') {
                return next(new CustomError('Admin privileges required', 'You do not have permission to view users', StatusCodes.FORBIDDEN));
            }
            const users = await userService.getUsers();
            return res.status(200).json(users);
        }
        catch (err) {
            return next(new CustomError('Failed to fetch users', 'Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR));
        }
    }
}


export default new UserController();
