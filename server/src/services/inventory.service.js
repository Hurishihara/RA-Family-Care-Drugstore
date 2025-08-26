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
        catch (error) {
            console.error('Error fetching all items:', error);
            throw error;
        }
    }
    async updateItemById(id, fields) {
        try {
            const updatedItem = await inventoryDB.updateItemById(id, fields);
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
        catch (error) {
            console.error('Error updating item by ID:', error);
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