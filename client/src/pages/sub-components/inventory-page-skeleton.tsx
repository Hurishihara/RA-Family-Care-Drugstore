import { Skeleton } from "@/components/ui/skeleton";

interface InventoryPageSkeletonProps {
    title: string;
    description: string;
}

const InventoryPageSkeleton = ({ title, description }: InventoryPageSkeletonProps) => {
    return (
        <>
            <div className='flex flex-col items-left m-4 gap-2'>
                <h1 className='font-primary font-semibold text-2xl text-deep-sage-green-800'>{title}</h1>
                <h1 className='font-primary font-normal text-xs text-muted-foreground'>{description}</h1>
            </div>
            <div className='flex base:flex-col xs:flex-row m-4 items-start gap-2'>
                <Skeleton className='h-8 w-55 mt-2' />
                <Skeleton className='h-8 w-40 mt-2' />
            </div>
            <div className='m-4 rounded-lg  border border-muted'>
                <Skeleton className='h-140 w-full' />
            </div>
            <div className='flex items-center base:justify-center xl:justify-end  space-x-3 mx-4 mb-15'>
                <Skeleton className='h-8 w-28' />
                <Skeleton className='h-8 w-28' />
                <Skeleton className='h-8 w-28' />
            </div>    
        </>
    )
}

export default InventoryPageSkeleton;