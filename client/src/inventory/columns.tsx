import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon, MoreHorizontalIcon } from 'lucide-react';

export type InventoryItem = {
    id: string;
    medicineName: string;
    category: string;
    quantity: number;
    pricePerUnit: number;
    costPerUnit: number;
    expiryDate: string;
    expirationDate: string;
    dateReceived: string;
}

export const inventoryColumns: ColumnDef<InventoryItem>[] = [
    {
        accessorKey: 'medicineName',
        header: () => <div className='font-primary font-semibold text-black'> Medicine Name</div>,
        cell: ({ row }) => {
            return <div className='font-secondary font-normal text-black'> {row.getValue('medicineName')} </div>
        }
        
    },
    {
        accessorKey: 'category',
        header: () => <div className='font-primary font-semibold text-black'> Category </div>,
        cell: ({ row }) => {
            return <div className='font-secondary font-normal text-black'> {row.getValue('category')} </div>
        }
    },
    {
        accessorKey: 'quantity',
        header: ({ column }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='sm' className='hover:bg-deep-sage-green-100 cursor-pointer '>
                        <span className='font-secondary font-semibold text-black'> Quantity </span>
                        {column.getIsSorted() === 'desc' ? (
                            <ArrowDownIcon />
                        ) : column.getIsSorted() === 'asc' ? (
                            <ArrowUpIcon />
                        ) : (
                            <ChevronsUpDownIcon />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start' className='font-secondary font-medium text-black'>
                    <DropdownMenuItem className='cursor-pointer' onClick={() => column.toggleSorting(false)}>
                        <ArrowUpIcon className='text-deep-sage-green-700' />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer' onClick={() => column.toggleSorting(true)}>
                        <ArrowDownIcon className='text-deep-sage-green-700' />
                        Desc
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
        cell: ({ row }) => {
            return <div className='font-secondary font-normal text-black ml-7'> {row.getValue('quantity')} </div>
        }
    },
    {
        accessorKey: 'pricePerUnit',
        header: () => <div className='font-primary font-semibold text-black'> Price per Unit </div>,
        cell: ({ row }) => {
            return <div className='font-secondary font-normal text-black'> {row.getValue('pricePerUnit')} </div>
        }
    },
    {
        accessorKey: 'costPerUnit',
        header: () => <div className='font-primary font-semibold text-black'> Cost per Unit </div>,
        cell: ({ row }) => {
            return <div className='font-secondary font-normal'> {row.getValue('costPerUnit')} </div>
        }

    },
    {
        accessorKey: 'expiryDate',
       header: () => <div className='font-primary font-semibold text-black'> Expiry Date </div>,
       cell: ({ row }) => {
            return <div className='font-secondary font-normal text-black'> {row.getValue('expiryDate')} </div>
        }
    },
    {
        accessorKey: 'dateReceived',
        header: () => <div className='font-primary font-semibold text-black'> Date Received </div>,
        cell: ({ row }) => {
            return <div className='font-secondary font-normal text-black'> {row.getValue('dateReceived')} </div>
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const inventory = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0 hover:bg-gray-100 cursor-pointer'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontalIcon className='h-4 w-4' />
                        </Button> 
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel className='font-primary font-semibold'>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => alert(`Edit ${inventory.medicineName}`)}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='cursor-pointer' >View item</DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer' >Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]