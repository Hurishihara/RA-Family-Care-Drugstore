import authService from '../services/auth.service.js';
import { serialize } from 'cookie';
import CustomError from '../utils/error.js';
import { StatusCodes } from 'http-status-codes';

class AuthController {
    async loginUser(req, res, next) {
        try {
            const { userName, password } = req.body;
            const { token, user } = await authService.loginUser(userName, password);
            res.setHeader('Set-Cookie', serialize('authToken', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 60 * 60 * 14, // 14 hours
                path: '/'
            }))
            res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, role: user.role } });
        }
        catch (err) {
            if (err.message === 'Invalid username or password') {
                return next(new CustomError('Login failed', 'Invalid username or password', StatusCodes.UNAUTHORIZED));
            }
            next(new CustomError('Login failed', 'Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR));
            return;
        }
    }
    async logoutUser(req, res) {
        try {
            res.clearCookie('authToken', {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                path: '/',
                maxAge: 0
            })
            res.status(200).json({ message: 'Logout successful' });
        }
        catch (err) {
            console.error('AuthController: Error during logout:', err);
            next(new CustomError('Logout failed', 'Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR));
        }
    }
    async getCurrentUser(req, res) {
        try {
            const currentUser = req.user;
            const user = await authService.getCurrentUser(currentUser.userId);
            res.status(200).json(user);
        }
        catch (err) {
            console.error('AuthController: Error fetching current user:', err);
            if (err.message === 'User not found') {
                next(new CustomError('User not found', 'No user found with the given details', StatusCodes.NOT_FOUND));
                return;
            }
            next(new CustomError('Failed to retrieve user', 'Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR));
            return;
        }
    }
}


export default new AuthController();
