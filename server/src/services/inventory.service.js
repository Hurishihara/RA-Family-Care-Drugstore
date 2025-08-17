import inventoryDB from '../db/models/inventory.js';

class InventoryService {
    async addItem(name, category, quantity, pricePerUnit, costPerUnit, expiryDate, dateReceived) {
        try {
            const newItem = await inventoryDB.addItem(name, category, quantity, pricePerUnit, costPerUnit, expiryDate, dateReceived);
            return newItem;
        }
        catch (error) {
            console.error('Error adding item:', error);
            throw error;
        }
    }
    async getAllItems() {
        try {
            const items = await inventoryDB.getAllItems();
            return items;
        }
        catch (error) {
            console.error('Error fetching all items:', error);
            throw error;
        }
    }
    async deleteItemById(id) {
       try {
            const deletedItem = await inventoryDB.deleteItemById(id);
            return deletedItem;
        }
        catch (error) {
            console.error('Error deleting item by ID:', error);
            throw error;
        }
    }
}


export default new InventoryService();