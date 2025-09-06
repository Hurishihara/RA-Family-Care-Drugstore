export const getPercentageChange = (current: number, previous: number) => {
    if (previous === 0) {
        if (current === 0) {
            return 0; // No change
        }
        return 0; // Avoid division by zero; define as 0% change
    }
    return ((current - previous) / previous) * 100;
}