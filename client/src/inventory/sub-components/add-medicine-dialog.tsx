import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { medicineSchema, type medicineFormType } from '@/schemas/medicine.schema'
import { api } from '@/utils/axios.config'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, HashIcon, PhilippinePesoIcon, PillBottleIcon, TargetIcon } from 'lucide-react'
import type React from 'react'
import { useForm } from 'react-hook-form'


type AddMedicineDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const AddMedicineDialog = ({
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
            expirationDate: new Date(),
            dateReceived: new Date()
        },

        shouldUnregister: true,
        mode: 'onChange'
    });

    const handleSubmitAddMedicine = async (data: medicineFormType) => {
        await api.post('/inventory/add-inventory', data);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='font-primary font-semibold text-xl text-black'>Add Medicine</DialogTitle>
                    <DialogDescription className='font-primary font-normal text-xs text-black'>Fill in the details of the medicine you want to add to your inventory.</DialogDescription>
                </DialogHeader>
                <Separator className='my-5' />
                <Form {...medicineForm}>
                    <form
                    id='add-medicine-form'
                    onSubmit={medicineForm.handleSubmit(handleSubmitAddMedicine)}>
                        <div className='grid grid-cols-12 gap-3 font-secondary '>
                            <div className='col-span-6 mb-5'>
                                <FormField
                                control={medicineForm.control}
                                name='medicineName'
                                render={({ field }) => (
                                    <FormItem className='relative'>
                                        <FormLabel htmlFor='medicineName' className='text-sm'>Medicine Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                className={`px-10 ring-0 border-2 border-deep-sage-green-100 focus:!border-deep-sage-green focus-visible:ring-offset-0 focus-visible:ring-0 ${medicineForm.formState.errors.medicineName ? 'focus:!border-red-500' : ''}`}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute top-16.5 text-xs'/>
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
                                            <FormLabel htmlFor='category' className='text-sm'>
                                                Category
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id='category'
                                                    className={`px-10 ring-0 border-2 border-deep-sage-green-100 focus:!border-deep-sage-green focus-visible:ring-offset-0 focus-visible:ring-0 ${medicineForm.formState.errors.category ? 'focus:!border-red-500' : ''}`}
                                                    disabled={medicineForm.formState.isSubmitting}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className='absolute left-0 top-16.5 text-xs' />
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
                                        <FormLabel htmlFor='quantity' className='text-sm'>
                                            Quantity
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id='quantity'
                                                className={`px-10 ring-0 border-2 border-deep-sage-green-100 focus:!border-deep-sage-green focus-visible:ring-offset-0 focus-visible:ring-0 ${medicineForm.formState.errors.quantity ? 'focus:!border-red-500' : ''}`}
                                                type='number'
                                                {...{
                                                    ...field,
                                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.value ? Number(e.target.value) : '')
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-16.5 text-xs' />
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
                                        <FormLabel htmlFor='pricePerUnit' className='text-sm'>
                                            Price per unit
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id='pricePerUnit'
                                                className={`px-10 ring-0 border-2 border-deep-sage-green-100 focus:!border-deep-sage-green focus-visible:ring-offset-0 focus-visible:ring-0 ${medicineForm.formState.errors.pricePerUnit ? 'focus:!border-red-500' : ''}`}
                                                type='number'
                                                {...{
                                                    ...field,
                                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.value ? Number(e.target.value) : ''),
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-16.5 text-xs' />
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
                                        <FormLabel htmlFor='costPerUnit'>Cost per unit</FormLabel>
                                        <FormControl>
                                            <Input
                                                id='costPerUnit'
                                                className={`px-10 ring-0 border-2 border-deep-sage-green-100 focus:!border-deep-sage-green focus-visible:ring-offset-0 focus-visible:ring-0 ${medicineForm.formState.errors.costPerUnit ? 'focus:!border-red-500' : ''}`}
                                                type='number'
                                                {...{
                                                    ...field,
                                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.value ? Number(e.target.value): ''),
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-15 text-xs' />
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
                                        <FormLabel htmlFor='expirationDate'>Expiration Date</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant='outline'
                                                        className={cn('w-full text-right', !field.value && 'text-muted-foreground')}
                                                    >
                                                        <CalendarIcon
                                                            className={`absolute left-3 top-10 transform -translate-y-1/2 text-deep-sage-green-700 ${medicineForm.formState.errors.expirationDate ? 'text-red-500' : ''}`}
                                                            style={{ height: '1.1rem', width: '1.1rem' }}
                                                        />
                                                        {field.value ? format(field.value, 'PPP') : <span>Pick expiration date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className='w-auto p-0' align='center'>
                                                    <Calendar mode='single' selected={field.value} onSelect={field.onChange} captionLayout='dropdown' />
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
                                        <FormLabel>Date Received</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant='outline'
                                                        className={cn('w-full text-right', !field.value && 'text-muted-foreground')}
                                                    >
                                                        <CalendarIcon
                                                            className={`absolute left-3 top-10 transform -translate-y-1/2 text-deep-sage-green-700 ${medicineForm.formState.errors.dateReceived ? 'text-red-500' : ''}`}
                                                            style={{ height: '1.1rem', width: '1.1rem' }}
                                                        />
                                                        {field.value ? format(field.value, 'PPP') : <span>Pick received date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className='w-auto p-0' align='center'>
                                                    <Calendar mode='single' selected={field.value} onSelect={field.onChange} captionLayout='dropdown' />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-15 text-xs' />
                                    </FormItem>
                                )}
                            />
                            </div>
                        </div>
                        <DialogFooter className='mt-4 flex flex-row gap-2 font-secondary'>
                            <Button type='reset' variant='ghost' className='hover:bg-deep-sage-green-100 cursor-pointer' onClick={() => {medicineForm.reset(), onOpenChange(false)}}>
                                Cancel
                            </Button>
                            <Button type='submit' form='add-medicine-form' className='bg-deep-sage-green-700 text-white hover:bg-deep-sage-green-600 cursor-pointer'>
                                Add Medicine
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddMedicineDialog
