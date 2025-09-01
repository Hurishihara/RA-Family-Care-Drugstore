import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { type medicineFormType, type medicineType } from '@/types/medicine.type';
import { type ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { ArrowDownIcon, ArrowUpIcon, CalendarCheck2Icon, ChevronsUpDownIcon, HashIcon, MoreVerticalIcon, PhilippinePesoIcon, Pill, TagIcon } from 'lucide-react';
import React from 'react';
import EditMedicineDialog from './sub-components/edit-medicine-dialog';

export const inventoryColumns: ColumnDef<medicineType>[] = [
    {
        accessorKey: 'medicineName',
        header: () => <div className='flex flex-row gap-1 items-center'>
            <Pill className='h-4 w-4' />
            <h2>Medicine Name</h2>
        </div>,
        cell: ({ row }) => {
            return <div className='font-secondary font-bold text-deep-sage-green-800'> {row.getValue('medicineName')} </div>
        }
        
    },
    {
        accessorKey: 'quantity',
        header: ({ column }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='sm' className='font-primary font-bold hover:bg-deep-sage-green-100 hover:text-deep-sage-green-800 cursor-pointer '>
                        <HashIcon className='h-4 w-4' />
                        <span> Quantity </span>
                        {column.getIsSorted() === 'desc' ? (
                            <ArrowDownIcon />
                        ) : column.getIsSorted() === 'asc' ? (
                            <ArrowUpIcon />
                        ) : (
                            <ChevronsUpDownIcon />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='center' className='font-primary font-medium text-deep-sage-green-800'>
                    <DropdownMenuItem className='cursor-pointer' onClick={() => column.toggleSorting(false)}>
                        <ArrowUpIcon  className='h-4 w-4 text-muted-foreground'/>
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer' onClick={() => column.toggleSorting(true)}>
                        <ArrowDownIcon className='h-4 w-4 text-muted-foreground'/>
                        Desc
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
        cell: ({ row }) => {
            return <div className='font-secondary font-bold text-deep-sage-green-800 text-center w-30'> {row.getValue('quantity')} </div>
        }
    },
    {
        accessorKey: 'category',
        header: () => <div className='flex flex-row gap-1 items-center'>
            <TagIcon className='h-4 w-4' />
            <h2>Category</h2>
        </div>,
        cell: ({ row }) => {
            return <div className='font-medium text-muted-foreground'> {row.getValue('category')} </div>
        }
    },
    {
        accessorKey: 'pricePerUnit',
        header: () => <div className='flex flex-row gap-1 items-center'>
            <PhilippinePesoIcon className='h-4 w-4' />
            <h2>Price per Unit</h2>
        </div>,
        cell: ({ row }) => {
            const pricePerUnit = row.getValue('pricePerUnit') as medicineType['pricePerUnit'];
            return <div className='font-medium text-muted-foreground text-center w-29'> ₱{pricePerUnit.toFixed(2)} </div>
        }
    },
    {
        accessorKey: 'costPerUnit',
        header: () => <div className='flex flex-row gap-1 items-center'>
            <PhilippinePesoIcon className='h-4 w-4' />
            <h2>Cost per Unit</h2>
        </div>,
        cell: ({ row }) => {
            const costPerUnit = row.getValue('costPerUnit') as medicineType['costPerUnit'];
            return <div className='font-medium text-muted-foreground text-center w-28'> ₱{costPerUnit.toFixed(2)} </div>
        }

    },
    {
        accessorKey: 'expirationDate',
       header: () => <div className='flex flex-row gap-1 items-center'>
            <CalendarCheck2Icon className='h-4 w-4' />
            <h2> Expiration Date </h2>
       </div>,
       cell: ({ row }) => {
            const expiryDate = row.getValue('expirationDate') as string;
            const formattedDate = formatDate(new Date(expiryDate), 'dd MMM, yyyy');
            return <div className='font-medium text-muted-foreground w-32 text-center'>{ formattedDate }</div>
        }
    },
    {
        accessorKey: 'dateReceived',
        header: () => <div className='flex flex-row gap-1 items-center'>
            <CalendarCheck2Icon className='h-4 w-4' />
            <h2> Date Received </h2>
        </div>,
        cell: ({ row }) => {
            const expiryDate = row.getValue('dateReceived') as string;
            const formattedDate = formatDate(new Date(expiryDate), 'dd MMM, yyyy');
            return <div className='font-medium text-muted-foreground w-32 text-center'>{ formattedDate }</div>
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const [ selectedMedicine, setSelectedMedicine ] = React.useState<medicineFormType & { id: string } | undefined>(undefined);
            const [ isDialogOpen, setIsDialogOpen ] = React.useState(false);
            const medicine = row.original;
            const handleEdit = () => {
                setSelectedMedicine({
                    id: medicine['id'],
                    medicineName: medicine['medicineName'],
                    category: medicine['category'],
                    quantity: medicine['quantity'],
                    pricePerUnit: medicine['pricePerUnit'],
                    costPerUnit: medicine['costPerUnit'],
                    expirationDate: new Date(medicine['expirationDate']),
                    dateReceived: new Date(medicine['dateReceived'])
                });
                setIsDialogOpen(!isDialogOpen);
            }

            return (
                <>
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='h-8 w-8 p-0 hover:bg-gray-100 cursor-pointer'>
                                <span className='sr-only'>Open menu</span>
                                <MoreVerticalIcon className='h-4 w-4 text-muted-foreground' />
                            </Button> 
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <DropdownMenuLabel className='font-primary font-semibold'>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className='cursor-pointer font-primary font-medium text-muted-foreground' onClick={handleEdit}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='cursor-pointer font-primary font-medium text-muted-foreground' >Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {selectedMedicine ? (
                        <EditMedicineDialog
                            open={isDialogOpen}
                            onOpenChange={setIsDialogOpen}
                            medicineItem={selectedMedicine}
                        />
                    ) : null}
                </>
            )
        }
    }
]