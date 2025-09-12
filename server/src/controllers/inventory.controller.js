import { StatusCodes } from 'http-status-codes';
import user from '../db/models/user.js';
import inventoryService from '../services/inventory.service.js';
import CustomError from '../utils/error.js';

class InventoryController {
    async addItem(req, res, next) {
        try {
            const { medicineName, category, quantity, pricePerUnit, costPerUnit, expirationDate, dateReceived } = req.body;
            const newItem = await inventoryService.addItem(medicineName, category, quantity, pricePerUnit, costPerUnit, expirationDate, dateReceived);
            res.status(201).json({ message: 'Item added successfully', item: newItem });
        }
        catch (err) {
           return next(new CustomError('Failed to add item', 'Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR));
        }
    }
    async getAllItems(req, res) {
        try {
            const items = await inventoryService.getAllItems();
            res.status(200).json(items);
        }
        catch (err) {
           return next(new CustomError('Failed to fetch items', 'Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR));
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
        catch (err) {
            if (err.message === 'Item not found') {
                return next(new CustomError('Item not found', 'The item you are trying to update does not exist', StatusCodes.NOT_FOUND));
            }
            return next(new CustomError('Failed to update item', 'Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR));
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
        catch (err) {
            if (err.message === 'Item not found') {
                return next(new CustomError('Item not found', 'The item you are trying to delete does not exist', StatusCodes.NOT_FOUND));
            }
            return next(new CustomError('Failed to delete item', 'Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR));
        }
    }
}


export default new InventoryController();