import inventoryDB from '../db/models/inventory.js';

class InventoryService {
    async addItem(name, category, quantity, pricePerUnit, costPerUnit, expiryDate, dateReceived) {
        try {
            const newItem = await inventoryDB.addItem(name, category, quantity, pricePerUnit, costPerUnit, expiryDate, dateReceived);
            return newItem;
        }
        catch (err) {
            console.error('InventoryService: Failed adding new item:', err);
            throw err;
        }
    }
    async getAllItems() {
        try {
            const items = await inventoryDB.getAllItems();
            return items.map(item => ({
                id: item.id,
                medicineName: item.name,
                category: item.category,
                quantity: item.quantity,
                pricePerUnit: parseFloat(item.price_per_unit),
                costPerUnit: parseFloat(item.cost_per_unit),
                expirationDate: item.expiry_date,
                dateReceived: item.date_received
            }))
        }
        catch (err) {
            console.error('InventoryService: Failed fetching all items:', err);
            throw err;
        }
    }
    async updateItemById(id, fields) {
        try {
            const updatedItem = await inventoryDB.updateItemById(id, fields);
            if (!updatedItem) {
                throw new Error('Item not found');
            }
            return {
                id: updatedItem.id,
                medicineName: updatedItem.name,
                category: updatedItem.category,
                quantity: updatedItem.quantity,
                pricePerUnit: parseFloat(updatedItem.price_per_unit),
                costPerUnit: parseFloat(updatedItem.cost_per_unit),
                expirationDate: updatedItem.expiry_date,
                dateReceived: updatedItem.date_received
            }
        }
        catch (err) {
            console.error('InventoryService: Failed updating item by ID:', err);
            throw err;
        }
    }
    async deleteItemById(id) {
       try {
            const deletedItem = await inventoryDB.deleteItemById(id);
            if (!deletedItem) {
                throw new Error('Item not found');
            }
            return deletedItem;
        }
        catch (err) {
            console.error('InventoryService: Failed deleting item by ID:', err);
            throw err;
        }
    }
}


export default new InventoryService();