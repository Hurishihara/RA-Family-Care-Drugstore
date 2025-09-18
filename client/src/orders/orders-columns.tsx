import { type OrderWithTotalAndOrderRep } from '@/types/order.type';
import { type ColumnDef } from '@tanstack/react-table';
import { CalendarCheck2Icon, CircleXIcon, CreditCardIcon, HashIcon, LayersIcon, ScrollIcon, Trash2Icon, UserCheckIcon, ViewIcon, WifiOffIcon } from 'lucide-react';
import gcashlogo from '../assets/GCash-Logo.png'
import { formatDate } from 'date-fns';
import React from 'react';
import ViewOrderSheet from './sub-components/view-order-sheet';
import { useAuth } from '@/hooks/auth.hook';
import { hasPermission } from '@/utils/permission';
import { api } from '@/utils/axios.config';
import axios from 'axios';
import type { ErrorResponse } from '@/types/error.response';
import { toast } from 'sonner';

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
                {`ORD-${orderId.toString().padStart(3, '0')}`}
            </div>
        },
        filterFn: (row, columnId, value) => {
            const orderId = row.getValue(columnId) as Pick<OrderWithTotalAndOrderRep, 'orderId'>;
            const formattedOrderId = `ORD-${orderId.toString().padStart(3, '0')}`;
            return formattedOrderId.toLowerCase().includes((value as string).toLowerCase());
        }
    },
    {
        accessorKey: 'customer',
        header: () => <div className='flex flex-row gap-1 items-center '>
            <div>
                <UserCheckIcon className='h-4 w-4' />
            </div>
            <div>
                Customer
            </div>
        </div>,
        cell: ({ row }) => {
            return <div className='font-bold text-deep-sage-green-800'> {row.getValue('customer')} </div>
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
        accessorKey: 'date',
        header: () => <div className='flex flex-row gap-1 items-center '>
            <div>
                <CalendarCheck2Icon className='h-4 w-4' />
            </div>
            <div>
                Order Date
            </div>
        </div>,
        cell: ({ row }) => {
            const date = row.getValue('date') as OrderWithTotalAndOrderRep['date'];
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
            
            const handleDelete = async () => {
                try {
                    await api.delete(`/order/delete-order/${order.orderId}`);
                    window.location.reload();
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
                        });
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
                    });
                    return;
                }
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

