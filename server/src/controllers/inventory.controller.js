import { StatusCodes } from 'http-status-codes';
import inventoryService from '../services/inventory.service.js';
import CustomError from '../utils/error.js';

class InventoryController {
    async addItem(req, res, next) {
        try {
            const { medicineName, category, quantity, pricePerUnit, costPerUnit, expirationDate, dateReceived } = req.body;
            const addedMedicine = await inventoryService.addItem(medicineName, category, quantity, pricePerUnit, costPerUnit, expirationDate, dateReceived);
            res.status(201).json({ title: 'Medicine added to inventory successfully!', description: `${medicineName} has been added to your inventory.` });
        }
        catch (err) {
           return next(new CustomError('Failed to add item', 'Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR));
        }
    }
    async getAllItems(req, res) {
        try {
            const items = await inventoryService.getAllItems();
            console.log('I got called');
            res.status(200).json(items);
        }
        catch (err) {
           return next(new CustomError('Failed to fetch items', 'Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR));
        }
    }
    async updateItemById(req, res, next) {
        try {
            const currentUser = req.user;
            if (!currentUser || currentUser.role !== 'Admin') {
                return next(new CustomError('Admin privileges required', 'You do not have permission to update items', StatusCodes.FORBIDDEN));
            }
            const { id } = req.params;
            const { fields } = req.body;
            const updatedItem = await inventoryService.updateItemById(id, fields);
            res.status(200).json({ title: 'Medicine details updated successfully!', description: `${updatedItem.medicineName} has been updated.`, item: updatedItem });
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
            res.status(200).json({ title: 'Medicine deleted successfully!', description: `${deletedItem.name} has been removed from your inventory.` });
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