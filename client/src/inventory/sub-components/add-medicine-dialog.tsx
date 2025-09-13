import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { medicineSchema} from '@/schemas/medicine.schema'
import type { ErrorResponse } from '@/types/error.response'
import { type medicineFormType } from '@/types/medicine.type'
import { api } from '@/utils/axios.config'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { format } from 'date-fns'
import { CalendarIcon, CircleCheck, CircleXIcon, HashIcon, PhilippinePesoIcon, PillBottleIcon, TargetIcon, WifiOffIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'


type AddMedicineDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const AddMedicineDialog = React.memo(({
    open,
    onOpenChange,
}: AddMedicineDialogProps) => {

    const medicineForm = useForm<medicineFormType>({
        resolver: zodResolver(medicineSchema),
        defaultValues: {
            medicineName: '',
            category: '',
            pricePerUnit: 0,
            costPerUnit: 0,
            quantity: 0,
            expirationDate: undefined,
            dateReceived: undefined,
        },

        shouldUnregister: true,
        mode: 'onSubmit'
    });
   
    const handleSubmitMedicine = async (data: medicineFormType) => {
        try {
            await api.post('inventory/add-inventory', data);
            medicineForm.reset();
            toast('Medicine added to inventory successfully!', {
                classNames: {
                    title: '!font-primary !font-bold !text-deep-sage-green-500 text-md',
                    description: '!font-primary !font-medium !text-muted-foreground text-xs'
                },
                icon: <CircleCheck  className='w-5 h-5 text-deep-sage-green-500'/>,
                description: 'The new medicine has been added to your inventory.',
            });
            return;
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
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle 
                    className='font-primary font-bold text-xl text-deep-sage-green-800'>
                        Add Medicine
                    </DialogTitle>
                    <DialogDescription 
                    className='font-primary font-medium text-xs text-muted-foreground'>
                        Fill out the form below to add a new medicine to your inventory.
                    </DialogDescription>
                </DialogHeader>
                <Separator className='my-4 border-b-2 border-deep-sage-green-100' />
                <Form {...medicineForm}>
                    <form
                    id='add-medicine-form'
                    onSubmit={medicineForm.handleSubmit(handleSubmitMedicine)}>
                        <div className='grid grid-cols-12 gap-3 font-secondary '>
                            <div className='col-span-6 mb-5'>
                                <FormField
                                control={medicineForm.control}
                                name='medicineName'
                                render={({ field }) => (
                                    <FormItem className='relative'>
                                        <FormLabel htmlFor='medicineName' className='text-sm font-semibold text-muted-foreground'>Medicine Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                id='medicineName'
                                                className={`font-primary font-medium px-10 ring-0 border-2 border-deep-sage-green-100 focus:!border-deep-sage-green focus-visible:ring-offset-0 focus-visible:ring-0 ${medicineForm.formState.errors.medicineName ? 'focus:!border-red-500' : ''}`}
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
                                            <FormLabel htmlFor='category' className='text-sm font-primary font-semibold text-muted-foreground'>
                                                Category
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id='category'
                                                    className={`font-medium font-primary px-10 ring-0 border-2 border-deep-sage-green-100 focus:!border-deep-sage-green focus-visible:ring-offset-0 focus-visible:ring-0 ${medicineForm.formState.errors.category ? 'focus:!border-red-500' : ''}`}
                                                    disabled={medicineForm.formState.isSubmitting}
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
                                        <FormLabel htmlFor='costPerUnit' className='font-primary font-semibold text-muted-foreground'>Cost per unit</FormLabel>
                                        <FormControl>
                                            <Input
                                                id='costPerUnit'
                                                className={`font-primary font-medium px-10 ring-0 border-2 border-deep-sage-green-100 focus:!border-deep-sage-green focus-visible:ring-offset-0 focus-visible:ring-0 ${medicineForm.formState.errors.costPerUnit ? 'focus:!border-red-500' : ''}`}
                                                type='number'
                                                {...{
                                                    ...field,
                                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.value ? Number(e.target.value): ''),
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage className='font-primary font-medium absolute left-0 top-15 text-xs' />
                                        <PhilippinePesoIcon
                                            className={`absolute left-3 top-10 transform -translate-y-1/2 text-deep-sage-green-700 ${medicineForm.formState.errors.costPerUnit ? 'text-red-500' : ''}`}
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
                                        <FormLabel htmlFor='expirationDate' className='font-primary font-semibold text-muted-foreground'>Expiration Date</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant='outline'
                                                        className={cn('font-primary font-medium w-full text-right', !field.value && 'font-primary font-medium text-muted-foreground')}
                                                    >
                                                        <CalendarIcon
                                                            className={`absolute left-3 top-10 transform -translate-y-1/2 text-deep-sage-green-700 ${medicineForm.formState.errors.expirationDate ? 'text-red-500' : ''}`}
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
                                        <FormLabel className='font-primary font-semibold text-muted-foreground'>Date Received</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant='outline'
                                                        className={cn('font-primary font-medium w-full text-right', !field.value && 'font-primary font-medium text-muted-foreground')}
                                                    >
                                                        <CalendarIcon
                                                            className={`absolute left-3 top-10 transform -translate-y-1/2 text-deep-sage-green-700 ${medicineForm.formState.errors.dateReceived ? 'text-red-500' : ''}`}
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
                <Separator className='my-4 border-b-2 border-deep-sage-green-100' />
                <DialogFooter>
                    <div className='flex flex-row justify-center gap-3 w-full'>
                        <Button type='reset' variant='ghost' className='text-deep-sage-green-800 font-semibold hover:bg-deep-sage-green-100 cursor-pointer' onClick={() => {medicineForm.reset(), onOpenChange(false)}}>
                        Cancel
                    </Button>
                    <Button type='submit' form='add-medicine-form' variant='outline' className='font-secondary font-bold bg-deep-sage-green-800 text-white hover:bg-deep-sage-green-600 hover:text-white cursor-pointer'>
                        Add to Inventory
                    </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
});

export default AddMedicineDialog
