import user from '../db/models/user.js';
import inventoryService from '../services/inventory.service.js';

class InventoryController {
    async addItem(req, res) {
        try {
            const { medicineName, category, quantity, pricePerUnit, costPerUnit, expirationDate, dateReceived } = req.body;
            const newItem = await inventoryService.addItem(medicineName, category, quantity, pricePerUnit, costPerUnit, expirationDate, dateReceived);
            res.status(201).json({ message: 'Item added successfully', item: newItem });
        }
        catch (error) {
            console.error('Error adding item:', error);
            res.status(500).json({ message: 'Internal server error' });
            throw error;
        }
    }
    async getAllItems(req, res) {
        try {
            const items = await inventoryService.getAllItems();
            res.status(200).json(items);
        }
        catch (error) {
            console.error('Error fetching all items:', error);
            res.status(500).json({ message: 'Internal server error' });
            throw error;
        }
    }
    async updateItemById(req, res) {
        try {
            const currentUser = req.user;
            if (!currentUser || currentUser.role !== 'Admin') {
                return res.status(403).json({ error: 'Forbidden' });
            }
            const { id } = req.params;
            const { fields } = req.body;
            const updatedItem = await inventoryService.updateItemById(id, fields);
            console.log('Fields to update:', fields);
            console.log('Updated Item:', updatedItem);
            res.status(200).json(updatedItem);
        }
        catch (error) {
            console.error('Error updating item by ID:', error);
            res.status(500).json({ message: 'Internal server error' });
            throw error;
        }
    }
    async deleteItemById(req, res) {
        try {
            const currentUser = req.user;
            if (!currentUser || currentUser.role !== 'Admin') {
                return res.status(403).json({ error: 'Forbidden' });
            }
            const { id } = req.params;
            const deletedItem = await inventoryService.deleteItemById(id);
            res.status(200).json({ message: 'Item deleted successfully', item: deletedItem });
        }
        catch (error) {
            console.error('Error deleting item by ID:', error);
            res.status(500).json({ message: 'Internal server error' });
            throw error;
        }
    }
}


export default new InventoryController();