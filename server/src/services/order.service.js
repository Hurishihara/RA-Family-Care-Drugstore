import { pool } from '../db/dbClient.js';
import inventoryDB from '../db/models/inventory.js';
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
            console.error('OrderService: Failed fetching orders:', err);
            throw err;
        }
    }
    async addOrder(customerName, total, items, orderDate, paymentMethod, orderRepresentative) {
        // Transaction handling for adding order and updating inventory
        const client = await pool.connect();
        try {
            const stringifiedItems = JSON.stringify(items);
            await client.query('BEGIN');
            await orderDB.addOrder(customerName, total, stringifiedItems, orderDate, paymentMethod, orderRepresentative, client),
            await inventoryDB.updateInventoryAfterOrder(items, client);
            await client.query('COMMIT');
        }
        catch (err) {
            await client.query('ROLLBACK');
            console.error('OrderService: Failed adding new order:', err);
            throw err;
        }
        finally {
            client.release();
        }
    }
    async deleteOrder(orderId) {
        try {
            const deletedOrder = await orderDB.deleteOrder(orderId);
            if (!deletedOrder) {
                throw new Error('Order not found');
            }
            return deletedOrder;
        }
        catch (err) {
            console.error('OrderService: Failed deleting order:', err);
            throw err;
        }
    }
}

export default new OrderService();