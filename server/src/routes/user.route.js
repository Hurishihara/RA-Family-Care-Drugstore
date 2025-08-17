import { Router } from 'express';
import userController from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/add-user', userController.addUser);
userRouter.delete('/delete-user/:id', userController.deleteUser);


// This is a placeholder for the user routes.

export default userRouter;
