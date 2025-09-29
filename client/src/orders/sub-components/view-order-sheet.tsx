import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { type OrderWithTotalAndOrderRep } from '@/types/order.type';
import { formatDate } from 'date-fns';


type ViewOrderSheetProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    order: OrderWithTotalAndOrderRep
}

const ViewOrderSheet = ({
    open,
    onOpenChange,
    order
}: ViewOrderSheetProps) => {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className='min-w-[450px]'>
                <SheetHeader className='border-b-2 border-deep-sage-green-100'>
                    <SheetTitle className='font-primary text-deep-sage-green-800 font-bold text-xl'>
                        #{order.orderId ? `ORD-${order.orderId.toString().padStart(3, '0')}` : 'N/A'}
                    </SheetTitle>
                    <SheetDescription className='font-primary font-medium text-xs max-w-[200px]'>
                        Order details
                    </SheetDescription>
                </SheetHeader>
                <div className='flex flex-col items-start gap-1 mx-4'>
                    <h2 className='font-primary text-sm font-semibold text-muted-foreground'>
                        Created at
                    </h2>
                    <div className='font-primary font-medium text-sm text-deep-sage-green-800'>
                        <h3>
                            {formatDate(new Date(order.orderDate), 'dd MMM yyy, hh:mm aaa')}
                        </h3>
                    </div>
                </div>
                <div className='px-4'>
                    <Separator className='border-b-2 border-deep-sage-green-100' />
                </div>
                <h2 className='font-primary text-lg font-semibold text-deep-sage-green-800 mx-4'>Customer</h2>
                <div className='flex flex-row justify-start gap-10 mx-4 '>
                    <h2 className='font-primary text-sm font-medium text-muted-foreground'>
                        Full name:
                    </h2>
                    <h3 className='font-primary text-sm font-medium text-deep-sage-green-800'>
                        {order.customerName}
                    </h3>
                </div>
                <div className='px-4'>
                    <Separator className='border-b-2 border-deep-sage-green-100' />
                </div>
                <div className='flex flex-row items-center gap-2 mx-4'>
                    <h2 className='font-primary text-lg font-semibold text-deep-sage-green-800'>
                        Items
                    </h2>
                    <div className='w-5 rounded-xs bg-muted-foreground/10'>
                        <h2 className='font-primary text-xs font-semibold text-center text-deep-sage-green-800'>
                            {Object.keys(order.items).length}
                        </h2>
                    </div>
                </div>
                <ScrollArea className='h-62 mx-4 pr-4 mt-4 rounded-sm'>
                    {Object.entries(order.items).map(([item, { category, quantity, pricePerUnit }]) => (
                        <div key={item} className='flex flex-row justify-between items-center mb-3'>
                            <div className='flex flex-col items-start gap-0.5 w-30'>
                                <h2 className='font-primary text-sm font-semibold text-center text-deep-sage-green-800'>
                                    {item}
                                </h2>
                                <h2 className='font-primary text-xs font-medium text-muted-foreground'>
                                    {category}
                                </h2>
                            </div>
                            <div className='w-5 rounded-xs bg-muted-foreground/10'>
                                <h2 className='font-primary text-sm font-semibold text-center text-deep-sage-green-800'>
                                    {quantity}
                                </h2>
                            </div>
                            <h2 className='font-primary text-sm font-medium text-deep-sage-green-800'>
                                ₱{(quantity * pricePerUnit).toFixed(2)}
                            </h2>
                        </div>
                    ))}
                </ScrollArea>
                <div className='px-4'>
                    <Separator className='border-b-2 border-deep-sage-green-100' />
                </div>
                <h2 className='font-primary text-lg font-semibold text-deep-sage-green-800 mx-4'>
                    Payment
                </h2>
                <div className='flex flex-row justify-start gap-10 items-center mx-4'>
                    <h2 className='font-primary text-sm font-medium text-muted-foreground'>
                        Payment method:
                    </h2>
                    <h2 className='font-primary text-sm font-medium text-deep-sage-green-800'>
                        {order.paymentMethod}
                    </h2>
                </div>
                <div className='flex flex-row justify-start gap-10 items-center mx-4'>
                    <h2 className='font-primary text-sm font-medium text-muted-foreground'>
                        Total:
                    </h2>
                    <h2 className='font-primary text-xl font-bold text-deep-sage-green-800'>
                        ₱{order.total.toFixed(2)}
                    </h2>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default ViewOrderSheet;