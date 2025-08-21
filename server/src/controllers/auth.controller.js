import authService from '../services/auth.service.js';
import { serialize } from 'cookie';

class AuthController {
    async loginUser(req, res) {
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
            console.error('Error logging in user:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async logoutUser(req, res) {
        try {
            const currentUser = req.user;
            if (!currentUser) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
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
            console.error('Error logging out user:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getCurrentUser(req, res) {
        try {
            const currentUser = req.user;
            console.log('Current user:', currentUser);
            if (!currentUser) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const user = await authService.getCurrentUser(currentUser.userId);
            res.status(200).json(user);
        }
        catch (err) {
            console.error('Error fetching current user:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}


export default new AuthController();
