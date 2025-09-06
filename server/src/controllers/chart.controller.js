import chartService from '../services/chart.service.js';

class ChartController {
    async getOrdersBarChartData(req, res) {
        try {
            const data = await chartService.getOrdersBarChartData();
            res.status(200).json(data);
        }
        catch (err) {
            console.error('Error in getOrdersBarChartData controller:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getRevenuePieChartData(req, res) {
        try {
            const data = await chartService.getRevenuePieChartData();
            res.status(200).json(data);
        }
        catch (err) {
            console.error('Error in getRevenuePieChartData controller:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new ChartController();