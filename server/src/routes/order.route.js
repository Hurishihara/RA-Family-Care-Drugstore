import { Router } from 'express';
import orderController from '../controllers/order.controller.js';
import authValidation from '../middleware/auth.js';

const orderRouter = Router();

orderRouter.get('/get-orders', orderController.getOrders);
orderRouter.post('/add-order', authValidation, orderController.addOrder);
orderRouter.delete('/delete-order/:orderId', authValidation, orderController.deleteOrder);

export default orderRouter;