import { Router } from 'express';
import orderController from '../controllers/order.controller.js';

const orderRouter = Router();

orderRouter.get('/get-orders', orderController.getOrders);
orderRouter.post('/add-order', orderController.addOrder);
orderRouter.delete('/delete-order/:orderId', orderController.deleteOrder);

export default orderRouter;