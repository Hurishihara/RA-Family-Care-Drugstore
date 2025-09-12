import { Router } from 'express';
import inventoryRouter from './inventory.route.js';
import userRouter from './user.route.js';
import authRouter from './auth.route.js';
import orderRouter from './order.route.js';
import chartRouter from './chart.route.js';
import errorHandler from '../middleware/error.handler.js';

const router = Router();

router.use('/inventory', inventoryRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/order', orderRouter);
router.use('/chart', chartRouter);

router.use(errorHandler);

export default router;