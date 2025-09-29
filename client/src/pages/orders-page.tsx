import { orderColumns } from '../orders/orders-columns';
import OrderDataTable from '../orders/orders-data-table';
import type { OrderWithTotalAndOrderRep } from '@/types/order.type';
import axios from 'axios';
import type { ErrorResponse } from '@/types/error.response';
import { toast } from 'sonner';
import { CircleXIcon, WifiOffIcon } from 'lucide-react';
import { useAuth } from '@/hooks/auth.hook';
import { useApiQuery } from '@/hooks/use-api';

const CustomOrdersTablePage = () => {
    const { user } = useAuth();

    const { data, isPending, error, isSuccess, isError } = useApiQuery<OrderWithTotalAndOrderRep[]>({
        url: '/order/get-orders',
        queryKey: ['orders'],
        options: {
            enabled: user !== null, // only run the query if user is defined
            retry: 1,
            staleTime: 1000 * 60 * 10, // Stale after 10 minutes
            gcTime: 1000 * 60 * 30 // Cache for 30 minutes 
        }
    })

    if (error && isError) {
        if (axios.isAxiosError(error)) {
            const err = error.response?.data as ErrorResponse;
            toast(err.title, {
                classNames: {
                    title: '!font-primary !font-bold !text-red-500 text-md',
                    description: '!font-primary !font-medium !text-muted-foreground text-xs'
                },
                icon: <CircleXIcon className='w-5 h-5 text-red-500' />,
                description: err.description,
            })
            return;
        }
        const err = error as unknown as ErrorResponse;
        toast(err.title, {
            classNames: {
                title: '!font-primary !font-bold !text-red-500 text-md',
                description: '!font-primary !font-medium !text-muted-foreground text-xs'
            },
            icon: <WifiOffIcon className='w-5 h-5 text-red-500' />,
            description: err.description,
        })
        return;
    }

    return (
        <OrderDataTable columns={orderColumns} data={isSuccess && data ? data : []} />
    )
}

export default CustomOrdersTablePage;