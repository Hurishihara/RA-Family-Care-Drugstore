import { Button } from '@/components/ui/button'
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useAuth } from '@/hooks/auth.hook';
import { cn } from '@/lib/utils';
import { orderSchema } from '@/schemas/order.schema';
import { type OrderFormType } from '@/types/order.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDownIcon, TrashIcon } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

type CreateOrderSheetProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const medicines = [
    { medicineName: 'Aspirin', pricePerUnit: 10, category: 'Painkiller' },
    { medicineName: 'Paracetamol', pricePerUnit: 5, category: 'Painkiller' },
    { medicineName: 'Ibuprofen', pricePerUnit: 7, category: 'Painkiller' },
    { medicineName: 'Amoxicillin', pricePerUnit: 12, category: 'Antibiotic' },
    { medicineName: 'Ciprofloxacin', pricePerUnit: 15, category: 'Antibiotic' },
    { medicineName: 'Lisinopril', pricePerUnit: 20, category: 'Antihypertensive' },
    { medicineName: 'Amlodipine', pricePerUnit: 18, category: 'Antihypertensive' },
    { medicineName: 'Metformin', pricePerUnit: 25, category: 'Antidiabetic' },
    { medicineName: 'Glipizide', pricePerUnit: 22, category: 'Antidiabetic' },
];


const CreateOrderSheet = React.memo(({
    open,
    onOpenChange
}: CreateOrderSheetProps) => {

    const { user } = useAuth()

    const orderForm = useForm<OrderFormType>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            customer: '',
            date: new Date(),
            items: {},
            total: 0,
            paymentMethod: undefined,
            orderRepresentative: user?.name || ''
            
        }
    })

    const items = orderForm.watch('items');

    const handleSubmitOrder = async (data: OrderFormType) => {
        try {
            console.log(data);
        }
        catch (err) {
            console.error(err);
        }
    }
    

    const total = React.useMemo(() => {
        return Object.values(items ?? {}).reduce((sum, m) => sum + (m.quantity ?? 0) * (m.pricePerUnit ?? 0), 0);
    }, [items]);

    React.useEffect(() => {
        orderForm.setValue('total', total, { shouldDirty: true });
    }, [total, orderForm]);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className='min-w-[450px]'>
                <SheetHeader className='border-b-2 border-deep-sage-green-100 bg-deep-sage-green-50'>
                    <SheetTitle className='font-primary text-deep-sage-green-800 font-bold text-xl'>
                        New Order
                    </SheetTitle>
                    <SheetDescription className='font-primary font-medium text-xs max-w-[200px]'>
                        Fill out the necessary details to create a new order.
                    </SheetDescription>
                </SheetHeader>
                <Form {...orderForm}>
                    <form id='create-order-form' onSubmit={orderForm.handleSubmit(handleSubmitOrder)}>
                        <div className='flex flex-col gap-2 mx-4'>
                            <Label htmlFor='customer' className='font-primary text-deep-sage-green-800 font-semibold text-lg'>Customer</Label>
                            <FormField
                            control={orderForm.control}
                            name='customer'
                            render={({ field }) => (
                                <FormItem className='flex flex-row justify-between items-center'>
                                    <FormLabel className='text-sm font-primary font-medium text-muted-foreground'>Full name:</FormLabel>
                                    <FormControl>
                                        <Input
                                        id='customer'
                                        className='w-60 font-primary font-normal text-black px-3 py-2 ring-0 border-2 border-deep-sage-green-100 focus:!border-deep-sage-green-800 focus-visible:ring-offset-0 focus-visible:ring-0 rounded-md' 
                                        placeholder='Customer name' 
                                        {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                        </div>
                        <div className='p-4'>
                            <Separator className='border-b-2 border-deep-sage-green-100' />
                        </div>
                        <div className='flex flex-col gap-2 mx-4'>
                            <Label htmlFor='' className='font-primary text-deep-sage-green-800 font-semibold text-lg'>
                                Items
                            </Label>
                            <FormField control={orderForm.control} name='items' render={({ field }) => (
                                <>
                                    <FormItem className='flex flex-row justify-between items-start'>
                                        <FormLabel className='text-sm font-primary font-medium text-muted-foreground max-w-40'>Select medicines to add to the order:</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant='outline' className='font-medium font-primary text-muted-foreground cursor-pointer' role='combobox'>
                                                        {field.value && Object.keys(field.value).length > 0 ? 'Add more medicines' : 'Select medicines'}
                                                        <ChevronsUpDownIcon />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className='w-[200px] p-0' align='end'>
                                                    <Command>
                                                        <CommandInput className='font-primary font-medium' placeholder='Search medicine...' />
                                                        <CommandList>
                                                            <CommandGroup>
                                                                {medicines.map((med) => (
                                                                    <CommandItem className='font-primary font-normal text-deep-sage-green-800' key={med.medicineName} onSelect={() => {
                                                                        field.onChange({
                                                                            ...field.value,
                                                                            [med.medicineName]: {
                                                                                category: med.category,
                                                                                quantity: (field.value?.[med.medicineName]?.quantity ?? 0) + 1,
                                                                                pricePerUnit: med.pricePerUnit
                                                                            }
                                                                        })
                                                                    }}>
                                                                        {med.medicineName}
                                                                        <Check className={cn('ml-auto', items[med.medicineName] ? 'opacity-100' : 'opacity-0')} />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                    </FormItem>
                                <ScrollArea className='h-62 pr-4 mt-4 rounded-sm'>
                                    {Object.keys(field.value ?? {}).map((medicineName) => (
                                                    <div key={medicineName} className='flex flex-row justify-between py-1 items-center mb-3'>
                                                        <div className='flex flex-col gap-1 items-start w-30'>
                                                            <Label className='font-primary font-medium text-deep-sage-green-800'>{medicineName}</Label>
                                                            <Label className='font-secondary font-normal text-xs text-muted-foreground'>{field.value[medicineName]?.category}</Label>
                                                        </div>
                                                        <Input
                                                            type='number'
                                                            value={items[medicineName]?.quantity}
                                                            onChange={(e) => {
                                                                const newQuantity = parseInt(e.target.value) || 0;
                                                                orderForm.setValue('items', {
                                                                    ...items,
                                                                    [medicineName]: {
                                                                        ...items[medicineName],
                                                                        quantity: newQuantity,
                                                                        pricePerUnit: items[medicineName]?.pricePerUnit || 0
                                                                    }
                                                                }, { shouldDirty: true });
                                                            }}
                                                            className='w-30 font-secondary font-normal text-black ring-0 border-2 border-deep-sage-green-100 focus:!border-deep-sage-green-800 focus-visible:ring-offset-0 focus-visible:ring-0'
                                                        />
                                                        <TrashIcon 
                                                        className='w-4.5 text-deep-sage-green-800 cursor-pointer' 
                                                        onClick={() => {
                                                            const { [medicineName]: _, ...rest } = field.value;
                                                            orderForm.setValue('items', rest, { shouldDirty: true })
                                                        }}/>
                                                    </div>
                                                ))}
                                </ScrollArea>
                           </>
                           )} />
                        </div>
                        <div className='p-4'>
                            <Separator className='border-b-2 border-deep-sage-green-100' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='font-primary text-deep-sage-green-800 font-semibold text-lg mx-4'>Payment</Label>
                            <FormField control={orderForm.control} name='paymentMethod' render={({ field }) => (
                                <FormItem className='flex flex-row mx-4 justify-between items-center'>
                                    <FormLabel className='text-sm font-primary font-medium text-muted-foreground'>Payment method:</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className='font-primary font-medium cursor-pointer'>
                                                <SelectValue placeholder='Select payment method' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className='font-primary font-normal text-deep-sage-green-800'>
                                            <SelectItem value='Cash'>Cash</SelectItem>
                                            <SelectItem value='GCash'>GCash</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )} />
                            <Label className='text-sm font-primary font-medium text-muted-foreground mx-4 mt-4'>
                                Total:{' '} <span className='font-bold font-primary text-xl text-deep-sage-green-800 ml-auto'>₱{total.toFixed(2)}</span>
                            </Label>
                        </div>
                        <div className='p-4'>
                            <Separator className='border-b-2 border-deep-sage-green-100' />
                        </div>
                    </form>
                </Form>
                <SheetFooter className='flex flex-row items-center gap-2 justify-center bg-deep-sage-green-50 border-t-2 border-deep-sage-green-100'>
                    <SheetClose asChild>
                        <Button 
                        type='reset' 
                        size='default' 
                        variant='outline' 
                        className='cursor-pointer font-secondary font-normal text-deep-sage-green-800 hover:text-deep-sage-green-800 w-30'>
                            Cancel 
                        </Button>
                    </SheetClose>
                    <Button 
                    type='submit' 
                    size='default' 
                    variant='outline' 
                    form='create-order-form' 
                    className='font-secondary font-semibold text-white bg-deep-sage-green-800 hover:bg-deep-sage-green-600 hover:text-white cursor-pointer w-30'>
                        Place Order
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
})

export default CreateOrderSheet