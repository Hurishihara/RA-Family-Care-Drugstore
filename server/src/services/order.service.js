import orderDB from '../db/models/order.js';

class OrderService {
    async getOrders() {
        try {
            const orders = await orderDB.getOrders();
            return orders.map(order => ({
                orderId: order.id,
                customer: order.customer_name,
                total: Number(order.total),
                items: order.items,
                date: order.order_date,
                paymentMethod: order.payment_method,
                orderRepresentative: order.order_representative
            }))
        }
        catch (err) {
            console.error('Error fetching orders:', err);
            throw err;
        }
    }
    async addOrder(customerName, total, items, orderDate, paymentMethod, orderRepresentative) {
        try {
            const stringifiedItems = JSON.stringify(items);
            const newOrder = await orderDB.addOrder(customerName, total, stringifiedItems, orderDate, paymentMethod, orderRepresentative);
            return newOrder;
        }
        catch (err) {
            console.error('Error adding order:', err);
            throw err;
        }
    }
    async deleteOrder(orderId) {
        try {
            const deletedOrder = await orderDB.deleteOrder(orderId);
            return deletedOrder;
        }
        catch (err) {
            console.error('Error deleting order:', err);
            throw err;
        }
    }
}

export default new OrderService();