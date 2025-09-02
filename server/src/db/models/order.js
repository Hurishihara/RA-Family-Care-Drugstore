import { pool } from '../dbClient.js';

class OrderDB {
    async getOrders() {
        try {
            const res = await pool.query('SELECT * FROM orders ORDER BY id DESC');
            return res.rows;
        }
        catch (err) {
            console.error('Error fetching orders:', err);
            throw err;
        }
    }
    async addOrder(customerName, total, items, orderDate, paymentMethod, orderRepresentative) {
        try {
            const res = await pool.query(
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
            console.error('Error adding order:', err);
            throw err;
        }
    }
    async deleteOrder(orderId) {
        try {
            const res = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [orderId])
            return res.rows[0];
        }
        catch (err) {
            console.error('Error deleting order by ID:', err);
            throw err;
        }
    }
}

export default new OrderDB();