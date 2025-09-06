import React from 'react';
import { orderColumns } from '../orders/orders-columns';
import OrderDataTable from '../orders/orders-data-table';
import type { OrderWithTotalAndOrderRep } from '@/types/order.type';
import { api } from '@/utils/axios.config';

const CustomOrdersTablePage = () => {
    const [orders, setOrders] = React.useState<OrderWithTotalAndOrderRep[]>([]);

    React.useEffect(() => {
        const getOrder = async () => {
            try {
                const res = await api.get<OrderWithTotalAndOrderRep[]>('/order/get-orders');
                setOrders(res.data);
            }
            catch (err) {
                console.error('Error fetching order data:', err);
            }
        }
        getOrder();
    }, [])

    return (
        <OrderDataTable columns={orderColumns} data={orders} />
    )
}

export default CustomOrdersTablePage;