import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import { authValidation } from '../middleware/auth.js';

const userRouter = Router();

userRouter.get('/get-users', authValidation, userController.getUsers)
userRouter.post('/add-user', authValidation, userController.addUser);
userRouter.delete('/delete-user/:id', authValidation, userController.deleteUser);

export default userRouter;
