import { type Order } from '@/types/order.type';
import { type ColumnDef } from '@tanstack/react-table';
import { CalendarCheck2Icon, CreditCardIcon, HashIcon, LayersIcon, ScrollIcon, TrashIcon, UserCheckIcon, ViewIcon } from 'lucide-react';
import gcashlogo from '../assets/GCash-Logo.png'
import { formatDate } from 'date-fns';
import React from 'react';
import ViewOrderSheet from './sub-components/view-order-sheet';
import { useAuth } from '@/hooks/auth.hook';
import { hasPermission } from '@/utils/permission';

export const orderColumns: ColumnDef<Order>[] = [
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
                return <div className='font-bold text-deep-sage-green-800'> {row.getValue('orderId')} </div>
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
            const total = row.getValue('total') as Order['total'];
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
            const items = row.getValue('items') as Order['items'];
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
            const date = row.getValue('date') as Date;
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
            const paymentMethod = row.getValue('paymentMethod') as Order['paymentMethod'];
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
            return <div className='font-medium text-muted-foreground'> {row.getValue('orderRepresentative')} </div>
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const order = row.original;
            const [ isViewOrderSheetOpen, setIsViewOrderSheetOpen ] = React.useState(false);
            const { user } = useAuth();
            
            const handleDelete = () => {
                // Implement delete functionality here
                alert(`Delete order with ID: ${order.orderId}`); // Placeholder action
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
                                <TrashIcon role='button' onClick={handleDelete} className='text-muted-foreground h-4.5 cursor-pointer'/>
                            </div>
                        )}
                    </div>
                </>
            )
        }
    }
]

