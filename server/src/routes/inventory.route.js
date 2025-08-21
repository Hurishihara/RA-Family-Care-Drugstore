import { Router } from 'express';
import inventoryController from '../controllers/inventory.controller.js';
import authValidation from '../middleware/auth.js'

const inventoryRouter = Router();

inventoryRouter.post('/add-inventory', authValidation, inventoryController.addItem);
inventoryRouter.delete('/delete-inventory/:id', authValidation, inventoryController.deleteItemById);
//inventoryRouter.put('/update-inventory/:id', inventoryController.updateItemById);
inventoryRouter.get('/get-inventory', inventoryController.getAllItems);

export default inventoryRouter;
