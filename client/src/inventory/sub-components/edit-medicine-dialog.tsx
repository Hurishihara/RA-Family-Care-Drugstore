import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { useApiMutation } from '@/hooks/use-api'
import { cn } from '@/lib/utils'
import { medicineSchema} from '@/schemas/medicine.schema'
import type { ErrorResponse } from '@/types/error.response'
import type { medicineFormType, medicineType } from '@/types/medicine.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { format } from 'date-fns'
import { CalendarIcon, CircleCheckIcon, CircleXIcon, HashIcon, PhilippinePesoIcon, PillBottleIcon, TargetIcon, WifiOffIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type EditMedicineDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    medicineItem: medicineType | undefined;
}

const EditMedicineDialog = React.memo(({
    open,
    onOpenChange,
    medicineItem
}: EditMedicineDialogProps) => {

    const medicineForm = useForm<medicineFormType>({
        resolver: zodResolver(medicineSchema),
        defaultValues: medicineItem || {
            medicineName: '',
            category: '',
            quantity: 0,
            pricePerUnit: 0,
            costPerUnit: 0,
            expirationDate: undefined,
            dateReceived: undefined,
        }
    });

    const queryClient = useQueryClient();
    const { mutate, isPending: isMedicineMutationPending } = useApiMutation<{
        title: string;
        description: string;
        item: medicineType;
    }, unknown, medicineType>({
        url: `/inventory/edit-inventory/${medicineItem?.id}`,
        method: 'PATCH', 
    }, {
        onSuccess: ({ title, description, item }) => {
            const { medicineName, category, quantity, pricePerUnit, costPerUnit, expirationDate, dateReceived } = item;
            medicineForm.setValue('medicineName', medicineName);
            medicineForm.setValue('category', category);
            medicineForm.setValue('quantity', quantity);
            medicineForm.setValue('pricePerUnit', pricePerUnit);
            medicineForm.setValue('costPerUnit', costPerUnit);
            medicineForm.setValue('expirationDate', new Date(expirationDate));
            medicineForm.setValue('dateReceived', new Date(dateReceived));
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
        onMutate: async (editedMedicine) => {
            await queryClient.cancelQueries({ queryKey: ['inventory'] });
            const previousInventory = queryClient.getQueryData<medicineType[]>(['inventory']);
            const updatedInventory = previousInventory?.map((item) => item.id === editedMedicine.id ? {
                ...item,
                ...editedMedicine
            }: item);
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
                queryClient.setQueryData(['inventory'], (context as { previousInventory: medicineType[] }).previousInventory);
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
    })
    const handleEditMedicine = async (value: medicineFormType) => {
        // Ensure that only valid medicine items are edited
        if (!medicineItem?.id) {
            toast('Invalid Medicine Item', {
                classNames: {
                    title: '!font-primary !font-bold !text-red-500 text-md',
                    description: '!font-primary !font-medium !text-muted-foreground text-xs'
                },
                icon: <CircleXIcon className='w-5 h-5 text-red-500' />,
                description: 'The medicine item you are trying to edit does not exist.',
            })
            return;
        }
        mutate({
            ...value,
            id: medicineItem.id
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle 
                    className='font-primary font-bold text-xl text-deep-sage-green-800'>
                        Edit Medicine
                    </DialogTitle>
                    <DialogDescription 
                    className='font-primary font-medium text-xs text-muted-foreground'>
                        Edit the details of the selected medicine in your inventory.
                    </DialogDescription>
                </DialogHeader>
                <Separator className='my-4 border-b-2 border-deep-sage-green-100' />
                <Form {...medicineForm}>
                    <form
                    id='add-medicine-form'
                    onSubmit={medicineForm.handleSubmit(handleEditMedicine)}>
                        <div className='grid grid-cols-12 gap-3 font-secondary '>
                            <div className='col-span-6 mb-5'>
                                <FormField
                                control={medicineForm.control}
                                name='medicineName'
                                render={({ field }) => (
                                    <FormItem className='relative'>
                                        <FormLabel htmlFor='medicineName' className='font-primary font-semibold text-muted-foreground text-sm'>Medicine Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                className={`font-primary font-medium px-10 ring-0 border-2 border-deep-sage-green-100 focus:!border-deep-sage-green focus-visible:ring-offset-0 focus-visible:ring-0 ${medicineForm.formState.errors.medicineName ? 'focus:!border-red-500' : ''}`}
                                                disabled={isMedicineMutationPending}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='font-primary font-medium absolute top-16.5 text-xs'/>
                                        <PillBottleIcon
                                            className={`absolute left-3 top-11.5 transform -translate-y-1/2 text-deep-sage-green-700 ${medicineForm.formState.errors.medicineName ? 'text-red-500' : ''}`}
                                            style={{ height: '1.1rem', width: '1.1rem' }}
                                        />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <div className='col-span-6 mb-5'>
                                <FormField
                                    control={medicineForm.control}
                                    name='category'
                                    render={({ field }) => (
                                        <FormItem className='relative'>
                                            <FormLabel htmlFor='category' className='font-primary font-semibold text-muted-foreground text-sm'>
                                                Category
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id='category'
                                                    className={`font-primary font-medium px-10 ring-0 border-2 border-deep-sage-green-100 focus:!border-deep-sage-green focus-visible:ring-offset-0 focus-visible:ring-0 ${medicineForm.formState.errors.category ? 'focus:!border-red-500' : ''}`}
                                                    disabled={isMedicineMutationPending}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className='font-primary font-medium absolute left-0 top-16.5 text-xs' />
                                            <TargetIcon
                                                className={`absolute left-3 top-11.5 transform -translate-y-1/2 text-deep-sage-green-700 ${medicineForm.formState.errors.category ? 'text-red-500' : ''}`}
                                                style={{ height: '1.1rem', width: '1.1rem' }}
                                            />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='col-span-6 mb-5'>
                            <FormField
                                control={medicineForm.control}
                                name='quantity'
                                render={({ field }) => (
                                    <FormItem className='relative'>
                                        <FormLabel htmlFor='quantity' className='font-primary font-semibold text-muted-foreground text-sm'>
                                            Quantity
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id='quantity'
                                                className={`font-primary font-medium px-10 ring-0 border-2 border-deep-sage-green-100 focus:!border-deep-sage-green focus-visible:ring-offset-0 focus-visible:ring-0 ${medicineForm.formState.errors.quantity ? 'focus:!border-red-500' : ''}`}
                                                type='number'
                                                {...{
                                                    ...field,
                                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.value ? Number(e.target.value) : '')
                                                }}
                                                disabled={isMedicineMutationPending}
                                            />
                                        </FormControl>
                                        <FormMessage className='font-primary font-medium absolute left-0 top-16.5 text-xs' />
                                        <HashIcon
                                            className={`absolute left-3 top-11.5 transform -translate-y-1/2 text-deep-sage-green-700 ${medicineForm.formState.errors.quantity ? 'text-red-500' : ''}`}
                                            style={{ height: '1.1rem', width: '1.1rem' }}
                                        />
                                    </FormItem>
                                )}
                            />
                            </div>
                            <div className='col-span-6 mb-5'>
                            <FormField
                                control={medicineForm.control}
                                name='pricePerUnit'
                                render={({ field }) => (
                                    <FormItem className='relative'>
                                        <FormLabel htmlFor='pricePerUnit' className='font-primary font-semibold text-muted-foreground text-sm'>
                                            Price per unit
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id='pricePerUnit'
                                                className={`font-primary font-medium px-10 ring-0 border-2 border-deep-sage-green-100 focus:!border-deep-sage-green focus-visible:ring-offset-0 focus-visible:ring-0 ${medicineForm.formState.errors.pricePerUnit ? 'focus:!border-red-500' : ''}`}
                                                type='number'
                                                {...{
                                                    ...field,
                                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.value ? Number(e.target.value) : ''),
                                                }}
                                                disabled={isMedicineMutationPending}
                                            />
                                        </FormControl>
                                        <FormMessage className='font-primary font-medium absolute left-0 top-16.5 text-xs' />
                                        <PhilippinePesoIcon
                                            className={`absolute left-3 top-11.5 transform -translate-y-1/2 text-deep-sage-green-700 ${medicineForm.formState.errors.quantity ? 'text-red-500' : ''}`}
                                            style={{ height: '1.1rem', width: '1.1rem' }}
                                        />
                                    </FormItem>
                                )}
                            />
                            </div>
                            <div className='col-span-6 mb-5'>
                            <FormField
                                control={medicineForm.control}
                                name='costPerUnit'
                                render={({ field }) => (
                                    <FormItem className='relative'>
                                        <FormLabel htmlFor='costPerUnit' className='font-primary font-semibold text-muted-foreground text-sm'>Cost per unit</FormLabel>
                                        <FormControl>
                                            <Input
                                                id='costPerUnit'
                                                className={`font-primary font-medium px-10 ring-0 border-2 border-deep-sage-green-100 focus:!border-deep-sage-green focus-visible:ring-offset-0 focus-visible:ring-0 ${medicineForm.formState.errors.costPerUnit ? 'focus:!border-red-500' : ''}`}
                                                type='number'
                                                {...{
                                                    ...field,
                                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.value ? Number(e.target.value): ''),
                                                }}
                                                disabled={isMedicineMutationPending}
                                            />
                                        </FormControl>
                                        <FormMessage className='font-primary font-medium absolute left-0 top-15 text-xs' />
                                        <PhilippinePesoIcon
                                            className={`absolute left-3 top-11.5 transform -translate-y-1/2 text-deep-sage-green-700 ${medicineForm.formState.errors.costPerUnit ? 'text-red-500' : ''}`}
                                            style={{ height: '1.1rem', width: '1.1rem' }}
                                        />
                                    </FormItem>
                                )}
                            />
                            </div>
                            <div className='col-span-6 mb-5'>
                            <FormField
                                control={medicineForm.control}
                                name='expirationDate'
                                render={({ field }) => (
                                    <FormItem className='relative'>
                                        <FormLabel htmlFor='expirationDate' className='font-primary font-semibold text-muted-foreground text-sm'>Expiration Date</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant='outline'
                                                        className={cn('font-primary font-medium w-full text-right', !field.value && 'font-primary font-mediumtext-muted-foreground')}
                                                        disabled={isMedicineMutationPending}
                                                    >
                                                        <CalendarIcon
                                                            className={`absolute left-3 top-11.5 transform -translate-y-1/2 text-deep-sage-green-700 ${medicineForm.formState.errors.expirationDate ? 'text-red-500' : ''}`}
                                                            style={{ height: '1.1rem', width: '1.1rem' }}
                                                        />
                                                        {field.value ? format(field.value, 'PPP') : <span>Pick expiration date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className='w-auto p-0' align='center'>
                                                    <Calendar 
                                                    mode='single' 
                                                    selected={field.value} 
                                                    onSelect={field.onChange} 
                                                    startMonth={new Date(2015, 0)} 
                                                    endMonth={new Date(new Date().setFullYear(new Date().getFullYear() + 10))} 
                                                    captionLayout='dropdown'
                                                    hideNavigation
                                                    fixedWeeks />
                                                </PopoverContent>
                                            </Popover>
                                            </FormControl>
                                        <FormMessage className='absolute left-0 top-15 text-xs' />
                                    </FormItem>
                                )}
                            />
                            </div>
                            <div className='col-span-6 mb-5'>
                            <FormField
                                control={medicineForm.control}
                                name='dateReceived'
                                render={({ field }) => (
                                    <FormItem className='relative'>
                                        <FormLabel className='font-primary font-semibold text-muted-foreground text-sm'>Date Received</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant='outline'
                                                        className={cn('font-primary font-medium w-full text-right', !field.value && 'font-primary font-medium text-muted-foreground')}
                                                        disabled={isMedicineMutationPending}
                                                    >
                                                        <CalendarIcon
                                                            className={`absolute left-3 top-11.5 transform -translate-y-1/2 text-deep-sage-green-700 ${medicineForm.formState.errors.dateReceived ? 'text-red-500' : ''}`}
                                                            style={{ height: '1.1rem', width: '1.1rem' }}
                                                        />
                                                        {field.value ? format(field.value, 'PPP') : <span>Pick received date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className='w-auto p-0' align='center'>
                                                    <Calendar 
                                                    mode='single' 
                                                    selected={field.value} 
                                                    onSelect={field.onChange} 
                                                    captionLayout='dropdown'
                                                    startMonth={new Date(2015, 0)} 
                                                    endMonth={new Date(new Date().setFullYear(new Date().getFullYear() + 10))}
                                                    hideNavigation
                                                    fixedWeeks />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-15 text-xs' />
                                    </FormItem>
                                )}
                            />
                            </div>
                        </div>
                    </form>
                </Form>
                <Separator className='border-b-2 border-deep-sage-green-100' />
                <DialogFooter className='mt-4 flex flex-row gap-2'>
                    <div className='flex flex-row justify-center gap-3 w-full'>
                        <Button 
                        type='reset' 
                        variant='ghost' 
                        className='font-secondary font-semibold hover:bg-deep-sage-green-100 cursor-pointer'
                        onClick={() => {medicineForm.reset(), onOpenChange(false)}}
                        disabled={isMedicineMutationPending}>
                            Cancel
                        </Button>
                        <Button type='submit' variant='outline' form='add-medicine-form' className='font-secondary font-bold bg-deep-sage-green-800 text-white hover:bg-deep-sage-green-600 hover:text-white cursor-pointer'>
                            {isMedicineMutationPending ? (
                                <>
                                    <svg
                                     className='animate-spin mr-2'
                                    fill='none'
                                    height='20'
                                    viewBox='0 0 20 20'
                                    width='20'
                                    xmlns='http://www.w3.org/2000/svg'
                                    aria-hidden='true'
                                    >
                                        <circle
                                          cx='10'
                                          cy='10'
                                          r='8'
                                          stroke='currentColor'
                                          strokeWidth='2'
                                          className='stroke-gray-300'
                                        />
                                        <path
                                          fill='currentColor'
                                          d='M18 10c0 4.4183-3.5817 8-8 8s-8-3.5817-8-8h2c0 3.3137 2.6863 6 6 6s6-2.6863 6-6h2z'
                                        />
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                'Edit Details'
                            )}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
})

export default EditMedicineDialog
