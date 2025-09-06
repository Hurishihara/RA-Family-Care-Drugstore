import { Router } from 'express';
import chartController from '../controllers/chart.controller.js';
import authValidation from '../middleware/auth.js';


const chartRouter = Router();

chartRouter.get('/bar-chart-data', authValidation, chartController.getOrdersBarChartData);
chartRouter.get('/pie-chart-data', chartController.getRevenuePieChartData);

export default chartRouter;