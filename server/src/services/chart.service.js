import orderDB from '../db/models/order.js';
import { differenceInCalendarWeeks, endOfMonth } from 'date-fns';
import { getDates, getDayBucket } from '../utils/helper.js';

class ChartService {
    async getOrdersBarChartData () {
        try {
            const now = new Date();

            const { startOfToday, startOfYesterday, startOfThisWeek, startOfLastWeek, startOfThisMonth, startOfLastMonth } = getDates();

            const allOrders = await orderDB.getOrders();

            let currentDay = 0, previousDay = 0;
            let currentWeek = 0, previousWeek = 0;
            let currentMonth = 0, previousMonth = 0;
            
            // Buckets for bar chart data
            const dayLabels = [
                '8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM',
            ]
            const dayBuckets = Object.fromEntries(dayLabels.map(label => [label, 0]));

            const weekLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            const weekBuckets = Object.fromEntries(weekLabels.map(day => [day, 0]));

            const numWeeks = differenceInCalendarWeeks(endOfMonth(now), startOfThisMonth) + 1;
            const monthLabels = Array.from({ length: numWeeks }, (_, i) => `Week ${i + 1}`);
            const monthBuckets = Object.fromEntries(monthLabels.map(week => [week, 0]));



            allOrders.forEach(order => {
                const orderDate = new Date(order.order_date);

                // Daily
                if (orderDate >= startOfToday) {
                    currentDay++;
                }  
                else if (orderDate >= startOfYesterday && orderDate < startOfToday) {
                    previousDay++;
                }

                // Weekly
                if (orderDate >= startOfThisWeek) {
                    currentWeek++;
                }
                else if (orderDate >= startOfLastWeek && orderDate < startOfThisWeek) {
                    previousWeek++;
                }

                // Monthly
                if (orderDate >= startOfThisMonth) {
                    currentMonth++;
                }
                else if (orderDate >= startOfLastMonth && orderDate < startOfThisMonth) {
                    previousMonth++;
                }

                // Chart: Day (24 hours)
                if (orderDate >= startOfToday) {
                    const label = getDayBucket(orderDate);
                    dayBuckets[label]++;
                }

                // Chart: Week (7 days)
                if (orderDate >= startOfThisWeek && orderDate < now) {
                    const dayIndex = (orderDate.getDay() + 6) % 7; // Adjust so Monday=0, Sunday=6
                    const label = weekLabels[dayIndex];
                    weekBuckets[label]++;
                }

                // Chart: Month (4-5 weeks)
                if (orderDate >= startOfThisMonth && orderDate <= endOfMonth(now)) {
                    const weekNum = differenceInCalendarWeeks(orderDate, startOfThisMonth) + 1;
                    const label = `Week ${weekNum}`;
                    if (monthBuckets[label] !== undefined) {
                        monthBuckets[label]++;
                    }
                } 
            })

            const BarChartData = {
                day: Object.keys(dayBuckets).sort((a, b) => new Date(`1970/01/01 ${a}`) - new Date(`1970/01/01 ${b}`))
                .map(hour => ({ hour, Orders: dayBuckets[hour] })),
                week: Object.entries(weekBuckets).map(([ day, Orders ]) => ({ day, Orders })),
                month: Object.entries(monthBuckets).map(([ week, Orders ]) => ({ week, Orders })),
            }
            const BarChartDashboardStats = {
                day: { currentTotalOrders: currentDay, previousTotalOrders: previousDay },
                week: { currentTotalOrders: currentWeek, previousTotalOrders: previousWeek },
                month: { currentTotalOrders: currentMonth, previousTotalOrders: previousMonth },
            }

            return { BarChartData, BarChartDashboardStats }
        }
        catch (err) {
            console.error('ChartService: Failed getting orders bar chart data:', err);
            throw err;
        }
    }
    async getRevenuePieChartData () {
        try {
            const { startOfToday, startOfYesterday, startOfThisWeek, startOfLastWeek, startOfThisMonth, startOfLastMonth } = getDates();
            const allOrders = await orderDB.getOrders();

            let currentDayRevenue = 0, previousDayRevenue = 0;
            let currentWeekRevenue = 0, previousWeekRevenue = 0;
            let currentMonthRevenue = 0, previousMonthRevenue = 0;

            const paymentMethod = ['GCash', 'Cash'];
            const colors = { GCash: '#2c503b', Cash: '#3f7353' };
            const paymentMethodBuckets = {
                day: Object.fromEntries(paymentMethod.map(method => [method, 0])),
                week: Object.fromEntries(paymentMethod.map(method => [method, 0])),
                month: Object.fromEntries(paymentMethod.map(method => [method, 0])),
            }

            allOrders.forEach(order => {
                const orderDate = new Date(order.order_date);
                const orderRevenue = parseFloat(order.total) || 0;
                const method = order.payment_method;
                
                // Daily
                if (orderDate >= startOfToday) {
                    currentDayRevenue += orderRevenue;
                    paymentMethodBuckets.day[method] += orderRevenue;
                }  
                else if (orderDate >= startOfYesterday && orderDate < startOfToday) {
                    previousDayRevenue += orderRevenue;
                }
                // Weekly
                if (orderDate >= startOfThisWeek) {
                    currentWeekRevenue += orderRevenue;
                    paymentMethodBuckets.week[method] += orderRevenue;
                }
                else if (orderDate >= startOfLastWeek && orderDate < startOfThisWeek) {
                    previousWeekRevenue += orderRevenue;
                }
                // Monthly
                if (orderDate >= startOfThisMonth) {
                    currentMonthRevenue += orderRevenue;
                    paymentMethodBuckets.month[method] += orderRevenue;
                }
                else if (orderDate >= startOfLastMonth && orderDate < startOfThisMonth) {
                    previousMonthRevenue += orderRevenue;
                }
            })
            const PieChartData = {
                day: paymentMethod.map(method => ({
                    paymentMethod: method,
                    Revenue: paymentMethodBuckets.day[method],
                    fill: colors[method]
                })),
                week: paymentMethod.map(method => ({
                    paymentMethod: method,
                    Revenue: paymentMethodBuckets.week[method],
                    fill: colors[method]
                })),
                month: paymentMethod.map(method => ({
                    paymentMethod: method,
                    Revenue: paymentMethodBuckets.month[method],
                    fill: colors[method]
                }))
            }
            const PieChartDashboardStats = {
                day: { currentTotalRevenue: currentDayRevenue, previousTotalRevenue: previousDayRevenue },
                week: { currentTotalRevenue: currentWeekRevenue, previousTotalRevenue: previousWeekRevenue },
                month: { currentTotalRevenue: currentMonthRevenue, previousTotalRevenue: previousMonthRevenue },
            }
            return { PieChartData, PieChartDashboardStats }

        }
        catch (err) {
            console.error('ChartService: Failed getting revenue pie chart data:', err);
            throw err;
        }
    }
}

export default new ChartService();

