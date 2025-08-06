import { Router } from 'express';
import inventoryController from '../controllers/inventory.controller.js';

const inventoryRouter = Router();

inventoryRouter.post('/add-inventory');
inventoryRouter.delete('/delete-inventory/:id');
inventoryRouter.put('/update-inventory/:id');
inventoryRouter.get('/get-inventory');

// This is a placeholder for the inventory routes.

export default inventoryRouter;
