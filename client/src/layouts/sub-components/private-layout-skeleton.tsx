import { TabletsIcon } from 'lucide-react'

const PrivateLayoutSkeleton = () => {
    return (
        <div className='flex flex-row justify-center gap-3 items-center h-screen bg-gray-50'>
            <div >
                <TabletsIcon className='base:w-6 lg:w-9 base:h-6 lg:w-13 lg:h-13 text-deep-sage-green-700 animate-pulse delay-100'/>
            </div>
            <p className='base:text-lg basexl:text-lg xs:text-lg sm:text-lg md:text-lg lg:text-4xl font-primary font-black text-deep-sage-green-950 animate-pulse delay-1000'>
                RA Family Care
            </p>
        </div>
    )
}

export default PrivateLayoutSkeleton;