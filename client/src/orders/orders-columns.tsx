import { type OrderWithTotalAndOrderRep } from '@/types/order.type';
import { type ColumnDef } from '@tanstack/react-table';
import { CalendarCheck2Icon, CircleCheckIcon, CircleXIcon, CreditCardIcon, HashIcon, LayersIcon, ScrollIcon, Trash2Icon, UserCheckIcon, ViewIcon, WifiOffIcon } from 'lucide-react';
import gcashlogo from '../assets/GCash-Logo.png'
import { formatDate } from 'date-fns';
import React from 'react';
import ViewOrderSheet from './sub-components/view-order-sheet';
import { useAuth } from '@/hooks/auth.hook';
import { hasPermission } from '@/utils/permission';
import axios from 'axios';
import type { ErrorResponse } from '@/types/error.response';
import { toast } from 'sonner';
import { useApiMutation } from '@/hooks/use-api';
import { useQueryClient } from '@tanstack/react-query';

export const orderColumns: ColumnDef<OrderWithTotalAndOrderRep>[] = [
    {
        accessorKey: 'orderId',
        header: () => <div className='flex flex-row gap-1 items-center'>
            <div>
                <HashIcon className='h-4 w-4' />
            </div>
            <div>
                Order ID
            </div>
        </div>,
        cell: ({ row }) => {
            const orderId = row.getValue('orderId') as OrderWithTotalAndOrderRep['orderId'];
            return <div className='font-bold text-deep-sage-green-800'>
                {orderId ? `ORD-${orderId.toString().padStart(3, '0')}` : 'N/A'}
            </div>
        },
        filterFn: (row, columnId, value) => {
            const orderId = row.getValue(columnId) as OrderWithTotalAndOrderRep['orderId'];
            const formattedOrderId = `ORD-${orderId.toString().padStart(3, '0')}`;
            return formattedOrderId.toLowerCase().includes((value as string).toLowerCase());
        }
    },
    {
        accessorKey: 'customerName',
        header: () => <div className='flex flex-row gap-1 items-center '>
            <div>
                <UserCheckIcon className='h-4 w-4' />
            </div>
            <div>
                Customer
            </div>
        </div>,
        cell: ({ row }) => {
            return <div className='font-bold text-deep-sage-green-800'> {row.getValue('customerName')} </div>
        }
    },
    {
        accessorKey: 'total',
        header: () => <div className='flex flex-row gap-1 items-center '>
            <div>
                <ScrollIcon className='h-4 w-4' />
            </div>
            <div>
                Total
            </div>
        </div>,
        cell: ({ row }) => {
            const total = row.getValue('total') as OrderWithTotalAndOrderRep['total'];
            return (
                <div className='font-medium text-muted-foreground'>
                    ₱{total.toFixed(2)}
                </div>
            )
        }
        
    },
    {
        accessorKey: 'items',
        header: () => <div className='flex flex-row gap-1 items-center '>
            <div>
                <LayersIcon className='h-4 w-4' />
            </div>
            <div>
                Items
            </div>
        </div>,
        cell: ({ row }) => {
            const items = row.getValue('items') as OrderWithTotalAndOrderRep['items']
            const itemCount = Object.keys(items).length;
            return (
                <div className='font-medium text-muted-foreground'>
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </div>
            )
        }
    },
    {
        accessorKey: 'orderDate',
        header: () => <div className='flex flex-row gap-1 items-center '>
            <div>
                <CalendarCheck2Icon className='h-4 w-4' />
            </div>
            <div>
                Order Date
            </div>
        </div>,
        cell: ({ row }) => {
            const date = row.getValue('orderDate') as OrderWithTotalAndOrderRep['orderDate'];
            return <div className='font-medium text-muted-foreground'> { formatDate(date, 'dd MMM yyyy, hh:mm a') } </div>
        }
    },
    {
        accessorKey: 'paymentMethod',
        header: () => <div className='flex flex-row gap-1 items-center '>
            <div>
                <CreditCardIcon className='h-4 w-4' />
            </div>
            <div>
                Payment Method
            </div>
        </div>,
        cell: ({ row }) => {
            const paymentMethod = row.getValue('paymentMethod') as OrderWithTotalAndOrderRep['paymentMethod'];
            return (
                <div className='flex flex-row items-center gap-1 font-medium text-muted-foreground'>
                    {paymentMethod === 'GCash' ? 
                    <img src={gcashlogo} alt='GCash Logo' className='w-15 object-contain' /> : null}
                    {paymentMethod === 'Cash' ? 'Cash' : null}
                </div>
            )
        }
    },
    {
        accessorKey: 'orderRepresentative',
        header: () => <div className='flex flex-row gap-1 items-center '>
            <div>
                <UserCheckIcon className='h-4 w-4' />
            </div>
            <div>
                Order Representative
            </div>
        </div>,
        cell: ({ row }) => {
            const orderRepresentative = row.getValue('orderRepresentative') as OrderWithTotalAndOrderRep['orderRepresentative']
            return <div className='font-medium text-muted-foreground'>  {orderRepresentative} </div>
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const order = row.original;
            const [ isViewOrderSheetOpen, setIsViewOrderSheetOpen ] = React.useState(false);
            const { user } = useAuth();

            const queryClient = useQueryClient();
            const { mutate } = useApiMutation<{
                title: string;
                description: string;
            }, unknown, Pick<OrderWithTotalAndOrderRep, 'orderId'>>({
                url: `/order/delete-order/${order.orderId}`,
                method: 'DELETE',
            }, {
                onSuccess: ({ title, description }) => {
                    toast(title, {
                        classNames: {
                            title: '!font-primary !font-bold !text-deep-sage-green-500 text-md',
                            description: '!font-primary !font-medium !text-muted-foreground text-xs'
                        },
                         icon: <CircleCheckIcon className='w-5 h-5 text-deep-sage-green-500' />,
                        description: description,
                    })
                    queryClient.invalidateQueries({ queryKey: ['orders'] });
                    queryClient.invalidateQueries({ queryKey: ['bar-chart'] });
                    queryClient.invalidateQueries({ queryKey: ['pie-chart'] });
                },
                onMutate: async (deletedOrder) => {
                    await queryClient.cancelQueries({ queryKey: ['orders'] });
                    await queryClient.cancelQueries({ queryKey: ['bar-chart'] });
                    await queryClient.cancelQueries({ queryKey: ['pie-chart'] });
                    const previousOrders = queryClient.getQueryData<OrderWithTotalAndOrderRep[]>(['orders']);
                    const updatedOrders = previousOrders?.filter(order => order.orderId !== deletedOrder.orderId);
                    queryClient.setQueryData(['orders'], updatedOrders);

                    return { previousOrders };
                },
                onError: (error, _variables, context) => {
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
                    queryClient.setQueryData(['orders'], (context as { previousOrders: OrderWithTotalAndOrderRep[] }).previousOrders);
                    return;
                }
            })
            
            const handleDelete = async () => {
                mutate({
                    orderId: order.orderId
                })
            }

            return (
                <>
                    <div className='flex flex-row gap-2 items-center'>
                        <div>
                            <ViewIcon role='button' className='text-muted-foreground h-4.5 cursor-pointer' onClick={() => setIsViewOrderSheetOpen(!isViewOrderSheetOpen)}/>
                            <ViewOrderSheet open={isViewOrderSheetOpen} onOpenChange={setIsViewOrderSheetOpen} order={order} />
                        </div>
                        {!hasPermission(user || { id: '1', name: 'Guest', role: 'Staff' }, 'delete:sales') ? null : (
                            <div>
                                <Trash2Icon role='button' onClick={handleDelete} className='text-muted-foreground h-4.5 cursor-pointer'/>
                            </div>
                        )}
                    </div>
                </>
            )
        }
    }
]

