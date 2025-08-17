import z from 'zod';

export const medicineSchema = z.object({
    medicineName: z.string()
    .min(2, { message: "Medicine name must be at least 2 characters long." })
    .max(100, { message: "Medicine name must not exceed 100 characters." }),

    category: z.string()
    .min(2, { message: "Category must be at least 2 characters long." })
    .max(50, { message: "Category must not exceed 50 characters." }),
    
    quantity: z.number({ message: 'Quantity must be a number.'})
    .int()
    .min(1, { message: "Quantity must be at least 1." }),

    pricePerUnit: z.number({ message: 'Price per unit must be a number'})
    .nonnegative({ message: "Price per unit must be a non-negative number." })
    .min(1, { message: "Price per unit must be at least 1." }),

    costPerUnit: z.number({ message: 'Cost per unit must be a number'})
    .nonnegative({ message: "Cost per unit must be a non-negative number." })
    .min(1, { message: "Cost per unit must be at least 1." }),

    expirationDate: z.date()
    .min(new Date(), { message: "Expiration date must be in the future." })
    .max(new Date(new Date().setFullYear(new Date().getFullYear() + 5)), { message: "Expiration date cannot be more than 5 years in the future." }),

    dateReceived: z.date()
    .min(new Date(new Date().setFullYear(new Date().getFullYear() - 5)), { message: "Date received cannot be older than 5 years." })
    .max(new Date(), { message: "Date received cannot be in the future." })
})

export type medicineFormType = z.infer<typeof medicineSchema>;