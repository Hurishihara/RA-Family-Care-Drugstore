import React from 'react';
import { orderColumns } from '../orders/orders-columns';
import OrderDataTable from '../orders/orders-data-table';
import type { OrderWithTotalAndOrderRep } from '@/types/order.type';
import { api } from '@/utils/axios.config';
import axios from 'axios';
import type { ErrorResponse } from '@/types/error.response';
import { toast } from 'sonner';
import { CircleXIcon, WifiOffIcon } from 'lucide-react';

const CustomOrdersTablePage = () => {
    const [orders, setOrders] = React.useState<OrderWithTotalAndOrderRep[]>([]);

    React.useEffect(() => {
        const getOrder = async () => {
            try {
                const res = await api.get<OrderWithTotalAndOrderRep[]>('/order/get-orders');
                setOrders(res.data);
            }
            catch (err) {
                if (axios.isAxiosError(err)) {
                    const error = err.response?.data as ErrorResponse;
                    toast(error.title, {
                        classNames: {
                            title: '!font-primary !font-bold !text-red-500 text-md',
                            description: '!font-primary !font-medium !text-muted-foreground text-xs'
                        },
                        icon: <CircleXIcon className='w-5 h-5 text-red-500' />,
                        description: error.description,
                    })
                    return;
                }
                const error = err as ErrorResponse;
                toast(error.title, {
                    classNames: {
                        title: '!font-primary !font-bold !text-red-500 text-md',
                        description: '!font-primary !font-medium !text-muted-foreground text-xs'
                    },
                    icon: <WifiOffIcon className='w-5 h-5 text-red-500' />,
                    description: error.description,
                })
                return;
            }
        }
        getOrder();
    }, [])

    return (
        <OrderDataTable columns={orderColumns} data={orders} />
    )
}

export default CustomOrdersTablePage;