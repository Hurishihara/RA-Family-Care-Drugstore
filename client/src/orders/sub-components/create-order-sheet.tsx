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
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/auth.hook';
import { useApiMutation, useApiQuery } from '@/hooks/use-api';
import { cn } from '@/lib/utils';
import { orderSchema } from '@/schemas/order.schema';
import type { ErrorResponse } from '@/types/error.response';
import { type medicineType } from '@/types/medicine.type';
import { type OrderWithTotalAndOrderRep, type OrderFormType } from '@/types/order.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Check, ChevronsUpDownIcon, CircleCheckIcon, CircleXIcon, TrashIcon, WifiOffIcon } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type CreateOrderSheetProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const CreateOrderSheet = React.memo(({
    open,
    onOpenChange
}: CreateOrderSheetProps) => {

    const { user } = useAuth();

    const orderForm = useForm<OrderFormType>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            customerName: '',
            orderDate: new Date(),
            items: {},
            paymentMethod: undefined,
            
        }
    })
    const items = orderForm.watch('items');
    const queryClient = useQueryClient();
    const { mutate, isPending: isOrderMutationPending }  = useApiMutation<{
        title: string;
        description: string;
    }, unknown, Omit<OrderWithTotalAndOrderRep, 'orderId'>>({
        url: '/order/add-order',
        method: 'POST',
    }, {
        onSuccess: ({ title, description }) => {
            toast(title, {
                classNames: {
                    title: '!font-primary !font-bold !text-deep-sage-green-500 text-md',
                    description: '!font-primary !font-medium !text-muted-foreground text-xs'
                },
                icon: <CircleCheckIcon  className='w-5 h-5 text-deep-sage-green-500'/>,
                description: description,
            }),
            orderForm.reset();
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['inventory'] });
            queryClient.invalidateQueries({ queryKey: ['pie-chart'] }); 
            queryClient.invalidateQueries({ queryKey: ['bar-chart'] });
            return
        },
        onMutate: async (newOrder) => {
            await queryClient.cancelQueries({ queryKey: ['orders'] });
            await queryClient.cancelQueries({ queryKey: ['inventory'] });
            await queryClient.cancelQueries({ queryKey: ['pie-chart'] });
            await queryClient.cancelQueries({ queryKey: ['bar-chart'] });
            const previousOrders = queryClient.getQueryData<OrderWithTotalAndOrderRep[]>(['orders']);
            queryClient.setQueryData(['orders'], (old: OrderWithTotalAndOrderRep[]) => [
                ...(old),
                { ...newOrder }
            ]);
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
    const { data, isPending: isMedicineQueryPending, error, isSuccess, isError } = useApiQuery<medicineType[]>({
        url: '/inventory/get-inventory',
        queryKey: ['inventory'],
        options: {
            enabled: user !== null, // only run the query if user is defined
            retry: 1,
            staleTime: 1000 * 60 * 10, // Stale after 10 minutes
            gcTime: 1000 * 60 * 30 // Cache for 30 minutes
        }
    })

    const handleOrderSubmit = (data: OrderFormType) => {
        mutate({
            customerName: data.customerName,
            items: data.items,
            orderDate: data.orderDate,
            paymentMethod: data.paymentMethod,
            total: calculatedTotal,
            orderRepresentative: user?.name || 'Unknown'
        });
        return;
    }

    const calculatedTotal = React.useMemo(() => {
        return Object.values(items ?? {}).reduce((sum, m) => sum + (m.quantity ?? 0) * (m.pricePerUnit ?? 0), 0);
    }, [items]);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className='min-w-[450px]'>
                <SheetHeader className='border-b-2 border-deep-sage-green-100'>
                    <SheetTitle className='font-primary text-deep-sage-green-800 font-bold text-xl'>
                        New Order
                    </SheetTitle>
                    <SheetDescription className='font-primary font-medium text-xs max-w-[200px]'>
                        Fill out the necessary details to create a new order.
                    </SheetDescription>
                </SheetHeader>
                <Form {...orderForm}>
                    <form id='create-order-form' onSubmit={orderForm.handleSubmit(handleOrderSubmit)}>
                        <div className='flex flex-col gap-2 mx-4'>
                            <Label htmlFor='customerName' className='font-primary text-deep-sage-green-800 font-semibold text-lg'>Customer</Label>
                            <FormField
                            control={orderForm.control}
                            name='customerName'
                            render={({ field }) => (
                                <FormItem className='flex flex-row justify-between items-center'>
                                    <FormLabel className='text-sm font-primary font-medium text-muted-foreground'>Full name:</FormLabel>
                                    <FormControl>
                                        <Input
                                        id='customerName'
                                        className='w-60 font-primary font-normal text-black px-3 py-2 ring-0 border-2 border-deep-sage-green-100 focus:!border-deep-sage-green-800 focus-visible:ring-offset-0 focus-visible:ring-0 rounded-md' 
                                        placeholder='Customer name'
                                        disabled={isOrderMutationPending}
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
                                                    <Button variant='outline' className='font-medium font-primary text-muted-foreground cursor-pointer' role='combobox' disabled={orderForm.formState.isSubmitting}>
                                                        {field.value && Object.keys(field.value).length > 0 ? 'Add more medicines' : 'Select medicines'}
                                                        <ChevronsUpDownIcon />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className='w-[200px] p-0' align='end'>
                                                    <Command>
                                                        <CommandInput className='font-primary font-medium' placeholder='Search medicine...' />
                                                        <CommandList>
                                                            <CommandGroup>
                                                                {isMedicineQueryPending ? (
                                                                    <div className='space-y-1'>
                                                                        <Skeleton className='h-7 w-full' />
                                                                        <Skeleton className='h-7 w-full' />
                                                                        <Skeleton className='h-7 w-full' />
                                                                        <Skeleton className='h-7 w-full' />
                                                                        <Skeleton className='h-7 w-full' />
                                                                        <Skeleton className='h-7 w-full' />
                                                                        <Skeleton className='h-7 w-full' />
                                                                    </div>
                                                                ) : isSuccess && data ? data.length === 0 ? (
                                                                    <div className='p-2 text-center font-primary font-normal text-deep-sage-green-800'>No medicines found.</div>
                                                                ) : data.map((med) => (
                                                                    <CommandItem className='font-primary font-normal text-deep-sage-green-800' key={med.id} onSelect={() => {
                                                                        const updatedItems = {
                                                                            ...field.value,
                                                                            [med.medicineName]: {
                                                                                itemId: med.id,
                                                                                category: med.category,
                                                                                quantity: field.value?.[med.medicineName]?.quantity || 1,
                                                                                pricePerUnit: med.pricePerUnit
                                                                            }
                                                                        };
                                                                        field.onChange(updatedItems);
                                                                        
                                                                    }}>
                                                                        {med.medicineName}
                                                                        <Check className={cn('ml-auto', items[med.medicineName] ? 'opacity-100' : 'opacity-0')} />
                                                                    </CommandItem>
                                                                )): isError && error ? (
                                                                    <div className='p-2 text-center font-primary font-normal text-deep-sage-green-800'>
                                                                        Error fetching medicines.
                                                                    </div>
                                                                ) : null}
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
                                                disabled={isOrderMutationPending}
                                            />
                                            <TrashIcon 
                                                className={`w-4.5 text-deep-sage-green-800 cursor-pointer ${isOrderMutationPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                onClick={() => {
                                                    if (orderForm.formState.isSubmitting) return;
                                                    const { [medicineName]: _, ...rest } = field.value;
                                                    orderForm.setValue('items', rest, { shouldDirty: true })
                                                }} 
                                                style={{ pointerEvents: orderForm.formState.isSubmitting ? 'none' : 'auto' }}
                                            />
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isOrderMutationPending}>
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
                                Total:{' '} <span className='font-bold font-primary text-xl text-deep-sage-green-800 ml-auto'>₱{calculatedTotal.toFixed(2)}</span>
                            </Label>
                        </div>
                        <div className='p-4'>
                            <Separator className='border-b-2 border-deep-sage-green-100' />
                        </div>
                    </form>
                </Form>
                <SheetFooter className='flex flex-row items-center gap-2 justify-center'>
                    <SheetClose asChild>
                        <Button 
                        type='button' 
                        size='default' 
                        variant='outline'
                        disabled={isOrderMutationPending} 
                        className='cursor-pointer font-secondary font-normal text-deep-sage-green-800 hover:text-deep-sage-green-800 w-30'>
                            Cancel 
                        </Button>
                    </SheetClose>
                    {/* Disable if submitting and empty items */}
                    <Button  
                    type='submit' 
                    size='default' 
                    variant='outline'
                    disabled={isOrderMutationPending || Object.keys(items ?? {}).length === 0 }
                    className='font-secondary font-semibold text-white bg-deep-sage-green-800 hover:bg-deep-sage-green-600 hover:text-white cursor-pointer w-35 transition-all ease-in-out duration-200'
                    form='create-order-form'>
                        {isOrderMutationPending ? (
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
                            'Place Order'
                        )}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
})

export default CreateOrderSheet