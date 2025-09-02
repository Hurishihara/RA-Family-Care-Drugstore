import orderService from '../services/order.service.js';

class OrderController {
    async getOrders(req, res) {
        try {
            const orders = await orderService.getOrders();
            res.status(200).json(orders);
        }
        catch (err) {
            console.error('Error in getOrders controller:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async addOrder(req, res) {
        try {
            const { customerName, total, items, orderDate, paymentMethod, orderRepresentative } = req.body;
            const newOrder = await orderService.addOrder(customerName, total, items, orderDate, paymentMethod, orderRepresentative);
            res.status(201).json(newOrder);
        }
        catch (err) {
            console.error('Error in addOrder controller:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async deleteOrder(req, res) {
        try {
            const { orderId } = req.params;
            const deletedOrder = await orderService.deleteOrder(orderId);
            res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
        }
        catch (err) {
            console.error('Error in deleteOrder controller:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new OrderController();