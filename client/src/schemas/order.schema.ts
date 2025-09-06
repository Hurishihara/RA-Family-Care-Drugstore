import z from 'zod';

export const orderSchema = z.object({
    customer: z.string()
    .min(2, { message: 'Customer name must be at least 2 characters long.' })
    .max(30, { message: 'Customer name must not exceed 30 characters.' }),

    date: z.date(),

    items: z.record(
        z.string(), 
        z.object({
            category: z.string(),
            quantity: z.number()
            .int({ message: 'Quantity must be a number.'})
            .min(1, { message: 'Quantity must be at least 1.' }),
            pricePerUnit: z.number()
            .nonnegative({ message: 'Price per unit must be a non-negative number.' })
            .min(1, { message: 'Price per unit must be at least 1.' }),

        })),
    paymentMethod: z.enum(['GCash', 'Cash'], { message: 'Payment method must be either GCash or Cash.' }),
})

