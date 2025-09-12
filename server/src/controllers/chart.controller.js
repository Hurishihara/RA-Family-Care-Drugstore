import { StatusCodes } from 'http-status-codes';
import chartService from '../services/chart.service.js';
import CustomError from '../utils/error.js';

class ChartController {
    async getOrdersBarChartData(req, res, next) {
        try {
            const data = await chartService.getOrdersBarChartData();
            res.status(200).json(data);
        }
        catch (err) {
            return next(new CustomError('Failed to retrieve bar chart data', 'Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR));
        }
    }
    async getRevenuePieChartData(req, res) {
        try {
            const data = await chartService.getRevenuePieChartData();
            res.status(200).json(data);
        }
        catch (err) {
            return next(new CustomError('Failed to retrieve pie chart data', 'Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR));
        }
    }
}

export default new ChartController();