import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import authValidation from '../middleware/auth.js';

const authRouter = Router();

authRouter.get('/current-user', authValidation, authController.getCurrentUser)
authRouter.post('/login', authController.loginUser);
authRouter.post('/logout', authValidation, authController.logoutUser);

export default authRouter;