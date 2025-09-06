import { startOfDay, subDays, startOfWeek, subWeeks, startOfMonth, subMonths } from 'date-fns';

// Assign to day buckets
export const getDayBucket = (orderDate) => {
    const h = orderDate.getHours();
    if (h < 9) return '8:00 AM';
    if (h < 11) return '10:00 AM';
    if (h < 13) return '12:00 PM';
    if (h < 15) return '2:00 PM';
    if (h < 17) return '4:00 PM';
    if (h < 19) return '6:00 PM';
    return '8:00 PM';
}

// Get date ranges for day, week, month
export const getDates = () => {
    const now = new Date();

    // -- Day
    const startOfToday = startOfDay(now);
    const startOfYesterday = subDays(startOfToday, 1)

    // -- Week
    const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 }); 
    const startOfLastWeek = subWeeks(startOfThisWeek, 1)

    // -- Month
    const startOfThisMonth = startOfMonth(now);
    const startOfLastMonth = subMonths(startOfThisMonth, 1);
    return {
        startOfToday,
        startOfYesterday,
        startOfThisWeek,
        startOfLastWeek,
        startOfThisMonth,
        startOfLastMonth
    }
}