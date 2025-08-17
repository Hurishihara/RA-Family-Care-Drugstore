import { Router } from 'express';
import inventoryController from '../controllers/inventory.controller.js';

const inventoryRouter = Router();

inventoryRouter.post('/add-inventory', inventoryController.addItem);
inventoryRouter.delete('/delete-inventory/:id', inventoryController.deleteItemById);
//inventoryRouter.put('/update-inventory/:id', inventoryController.updateItemById);
inventoryRouter.get('/get-inventory', inventoryController.getAllItems);

// This is a placeholder for the inventory routes.

export default inventoryRouter;
