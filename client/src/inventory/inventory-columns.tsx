import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { type medicineType } from '@/types/medicine.type';
import { type ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { ArrowDownIcon, ArrowUpIcon, CalendarCheck2Icon, ChevronsUpDownIcon, CircleCheckIcon, CircleXIcon, HashIcon, PhilippinePesoIcon, Pill, SquarePenIcon, TagIcon, Trash2Icon, WifiOffIcon } from 'lucide-react';
import React from 'react';
import EditMedicineDialog from './sub-components/edit-medicine-dialog';
import { useQueryClient } from '@tanstack/react-query';
import { useApiMutation } from '@/hooks/use-api';
import { toast } from 'sonner';
import axios from 'axios';
import type { ErrorResponse } from '@/types/error.response';

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
            const [ selectedMedicine, setSelectedMedicine ] = React.useState<medicineType | undefined>(undefined);
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

            const queryClient = useQueryClient();

            const { mutate } = useApiMutation<{
                title: string;
                description: string;
            }, unknown, Pick<medicineType, 'id'>>({
                url: `/inventory/delete-inventory/${medicine.id}`,
                method: 'DELETE'
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
                    queryClient.invalidateQueries({ queryKey: ['inventory'] });
                    return;
                },
                onMutate: async (deletedMedicine) => {
                    await queryClient.cancelQueries({ queryKey: ['inventory'] });
                    const previousInventory = queryClient.getQueryData<medicineType[]>(['inventory']);
                    const updatedInventory = previousInventory?.filter(item => item.id !== deletedMedicine.id);
                    queryClient.setQueryData(['inventory'], updatedInventory);
                    return { previousInventory };
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
                    queryClient.setQueryData(['inventory'], ( context as { previousInventory: medicineType[] }).previousInventory);
                    return;
                }
            })
            const handleDelete = async () => {
                mutate({ id: medicine.id });
            }

            return (
                <>
                    <div className='flex flex-row items-center gap-2'>
                        <SquarePenIcon role='button' className='text-muted-foreground h-4.5 cursor-pointer' onClick={handleEdit}/>
                        <Trash2Icon role='button' className='text-muted-foreground h-4.5 cursor-pointer' onClick={handleDelete}/>
                    </div>
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