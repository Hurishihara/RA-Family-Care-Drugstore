
type SelectTimeframe = 'day' | 'week' | 'month';

type BarChartDashboardStats = {
    [key in SelectTimeframe]: {
        currentTotalOrders: number;
        previousTotalOrders: number;
    }
}

type PieChartDashboardStats = {
    [key in SelectTimeframe]: {
        currentTotalRevenue: number;
        previousTotalRevenue: number;
    }
}

type DayBarChart = { hour: string, Orders: number }[];
type WeekBarChart = { day: string, Orders: number }[];
type MonthBarChart = { week: string, Orders: number }[];

type DayPieChart = { paymentMethod: string, Revenue: number, fill: string }[];
type WeekPieChart = { paymentMethod: string, Revenue: number, fill: string }[];
type MonthPieChart = { paymentMethod: string, Revenue: number, fill: string }[];

type BarChartData = {
    day: DayBarChart;
    week: WeekBarChart;
    month: MonthBarChart;
}

type PieChartData = {
    [key in SelectTimeframe]: DayPieChart | WeekPieChart | MonthPieChart;
}

type BarChartDashboardAPIResponse = {
    BarChartData: BarChartData;
    BarChartDashboardStats: BarChartDashboardStats;
}

type PieChartDashboardAPIResponse = {
    PieChartData: PieChartData;
    PieChartDashboardStats: PieChartDashboardStats;
}



export type { SelectTimeframe, BarChartDashboardStats, BarChartData, BarChartDashboardAPIResponse, PieChartData, PieChartDashboardStats ,PieChartDashboardAPIResponse };