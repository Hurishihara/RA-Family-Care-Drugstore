import { Skeleton } from "@/components/ui/skeleton";

const OrderPageSkeleton = ({ title, description }: {
    title: string;
    description: string;
}) => {
    return (
        <>
            <div className='flex flex-col items-left m-4 gap-2'>
                <h1 className='font-primary font-semibold text-2xl text-deep-sage-green-800'>{title}</h1>
                <h2 className='font-primary font-normal text-xs text-muted-foreground'>{description}</h2>
                <div className='flex base:flex-col xl:flex-row gap-3 mt-4'>
                    <Skeleton className='h-50 w-full' />
                    <Skeleton className='h-50 w-full' />
                </div>
                <div className='flex base:flex-col xs:flex-row items-start gap-2 mt-1'>
                    <Skeleton className='h-8 w-55 mt-2' />
                    <Skeleton className='h-8 w-40 mt-2' />
                </div>
                <div className='rounded-md'>
                    <Skeleton className='h-90 w-full' />
                </div>
            </div>
            <div className='flex items-center base:justify-center xl:justify-end  space-x-3 mx-4 mb-15'>
                <Skeleton className='h-8 w-28' />
                <Skeleton className='h-8 w-28' />
                <Skeleton className='h-8 w-28' />
            </div>
        </>
    )
}

export default OrderPageSkeleton;