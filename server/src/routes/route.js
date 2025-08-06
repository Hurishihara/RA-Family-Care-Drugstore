import { Router } from 'express';
import inventoryRouter from './inventory.route.js';
import userRouter from './user.route.js';
import authRouter from './auth.route.js';

const router = Router();

router.use('/inventory', inventoryRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);

// This is a placeholder for the main router that combines all routes.

export default router;