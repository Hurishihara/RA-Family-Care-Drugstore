import type { orderSchema } from '@/schemas/order.schema';
import type { z } from 'zod';

type OrderFormType = z.infer<typeof orderSchema>;

type Order = OrderFormType & {
    orderId: string;
}

type OrderWithTotalAndOrderRep = Order & {
    total: number;
    orderRepresentative: string;
}


export type { OrderFormType, Order, OrderWithTotalAndOrderRep };