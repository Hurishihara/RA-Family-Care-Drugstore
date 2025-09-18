import { StatusCodes } from 'http-status-codes';
import orderService from '../services/order.service.js';
import CustomError from '../utils/error.js';

class OrderController {
    async getOrders(req, res, next) {
        try {
            const orders = await orderService.getOrders();
            res.status(200).json(orders);
        }
        catch (err) {
            return next(new CustomError('Failed to fetch orders', 'Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR));
        }
    }
    async addOrder(req, res, next) {
        
        try {
            const { customerName, total, items, orderDate, paymentMethod, orderRepresentative } = req.body;
            await orderService.addOrder(customerName, total, items, orderDate, paymentMethod, orderRepresentative);
            res.status(201).json({ title: 'Order placed successfully', description: 'The new order has been placed to your orders list.'});
        }
        catch (err) {
            if (err.message.startsWith('Not enough stock available for')) {
                return next(new CustomError('Insufficient stock', err.message, StatusCodes.BAD_REQUEST));
            }
            return next(new CustomError('Failed to add order', 'Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR));
        }
    }
    async deleteOrder(req, res, next) {
        try {
            const currentUser = req.user;
            if (currentUser.role !== 'Admin') {
                return next(new CustomError('Admin privileges required', 'You do not have permission to delete orders', StatusCodes.FORBIDDEN));
            }
            const { orderId } = req.params;
            const deletedOrder = await orderService.deleteOrder(orderId);
            res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
        }
        catch (err) {
            if (err.message === 'Order not found') {
                return next(new CustomError('Order not found', 'The order you are trying to delete does not exist', StatusCodes.NOT_FOUND));
            }
            return next(new CustomError('Failed to delete order', 'Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR));
        }
    }
}

export default new OrderController();