import { pool } from '../dbClient.js';

class OrderDB {
    async getOrders() {
        try {
            const res = await pool.query('SELECT * FROM orders ORDER BY id DESC');
            return res.rows;
        }
        catch (err) {
            console.error('OrderDB: failed to query select for all orders', err);
            throw new Error('OrderDB: Failed to select all orders', { cause: err });
        }
    }
    async addOrder(customerName, total, items, orderDate, paymentMethod, orderRepresentative, client) {
        try {
            const res = await client.query(
                `
                    INSERT INTO ORDERS (
                        customer_name,
                        total,
                        items,
                        order_date,
                        payment_method,
                        order_representative 
                        ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
                `, [customerName, total, items, orderDate, paymentMethod, orderRepresentative]
            )
            return res.rows[0];
        }
        catch (err) {
           console.error('OrderDB: Failed to query insert for order', err);
           throw new Error('OrderDB: Failed to insert new order', { cause: err });
        }
    }
    async deleteOrder(orderId) {
        try {
            const res = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [orderId])
            return res.rows[0];
        }
        catch (err) {
            console.error('OrderDB: failed to query delete for order id', orderId, err);
            throw new Error('OrderDB: Failed to delete order', { cause: err });
        }
    }
    async getOrderByTimeframe(startDate) {
        try {
            const res = await pool.query('SELECT * FROM orders WHERE order_date >= $1 ORDER BY order_date ASC', [startDate]);
            return res.rows;
        }
        catch (err) {
            console.error('OrderDB: failed to query select for orders by timeframe', err);
            throw new Error('OrderDB: Failed to select orders by timeframe', { cause: err });
        }
    }
}

export default new OrderDB();