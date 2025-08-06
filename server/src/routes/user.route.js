import { Router } from 'express';
import userController from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/add-user');
userRouter.delete('/delete-user/:id');
userRouter.put('/update-user/:id');
userRouter.get('/get-user/:id');

// This is a placeholder for the user routes.

export default userRouter;
