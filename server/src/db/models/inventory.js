import { pool } from '../dbClient.js';

class InventoryDB {
    async addItem( name, category, quantity, pricePerUnit, costPerUnit, expiryDate, dateReceived ) {
        try {
            const res = await pool.query(
                'INSERT INTO inventory (name, category, quantity, price_per_unit, cost_per_unit, expiry_date, date_received) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [name, category, quantity, pricePerUnit, costPerUnit, expiryDate, dateReceived]
            )
            return res.rows[0];
        }
        catch (err) {
            console.error('InventoryDB: Failed to query insert for item', err);
            throw new Error('InventoryDB: Failed to insert new item', { cause: err });
        }
    }
    async getAllItems() {
        try {
            const res = await pool.query('SELECT * FROM inventory');
            return res.rows;
        }
        catch (err) {
            console.error('InventoryDB: failed to query select for all items', err);
            throw new Error('InventoryDB: Failed to select all items', { cause: err });
        }
    }

    async updateItemById(id, fields) {
        try {
            const { name, category, quantity, pricePerUnit, costPerUnit, expirationDate, dateReceived } = fields;
            const res = await pool.query(
                `UPDATE inventory SET
                    name = COALESCE($1, name),
                    category = COALESCE($2, category),
                    quantity = COALESCE($3, quantity),
                    price_per_unit = COALESCE($4, price_per_unit),
                    cost_per_unit = COALESCE($5, cost_per_unit),
                    expiry_date = COALESCE($6, expiry_date),
                    date_received = COALESCE($7, date_received)
                 WHERE id = $8 RETURNING *`,
                 [name, category, quantity, pricePerUnit, costPerUnit, expirationDate, dateReceived, id]
            )
            return res.rows[0];
        }
        catch (err) {
            console.error('InventoryDB: failed to query update for item id', id, err);
            throw new Error('InventoryDB: Failed to update item', { cause: err });
        }
    }

    async deleteItemById(id) {
        try {
            const res = await pool.query('DELETE FROM inventory WHERE id = $1 RETURNING *',
                [id]
            );
            return res.rows[0];
        }
        catch (err) {
            console.error('InventoryDB: failed to query delete for item id', id, err);
            throw new Error('InventoryDB: Failed to delete item', { cause: err });
        }
    }
}

export default new InventoryDB();