import * as React from 'react'
import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    getSortedRowModel,
    getFilteredRowModel,
    type PaginationState,
} from '@tanstack/react-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, ArrowRightIcon, BookOpenIcon, PackageSearchIcon, PlusIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/auth.hook'
import { hasPermission } from '@/utils/permission'
import AddMedicineDialog from './sub-components/add-medicine-dialog'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}



const DataTable = <TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) => {

    const { user } = useAuth()
    const [ isDialogOpen, setIsDialogOpen ] = React.useState(false) 
    const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>([])
    const [ sorting, setSorting ] = React.useState<SortingState>([])
    const [ pagination, setPagination ] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 15,
    })

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: setPagination,
        state: {
            columnFilters,
            sorting,
            pagination,
        }
    })
    
    return (
        <>
            <div className='flex flex-col items-left m-4 gap-2'>
                <h1 className='font-primary font-semibold text-2xl text-deep-sage-green-800'>Inventory Summary</h1>
                <h1 className='font-primary font-normal text-xs text-muted-foreground'>View and manage all medications in your pharmacy stock</h1>
            </div>
            <div className='flex flex-row mb-4 ml-4 items-center gap-2'>
                <div className='relative min-w-xs'>
                    <Input 
                    placeholder='Filter by name...' 
                    value={(table.getColumn('medicineName')?.getFilterValue() as string) ?? ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => table.getColumn('medicineName')?.setFilterValue(e.target.value)}
                    className='font-secondary font-normal text-black px-10 ring-0 border-2 border-deep-sage-green-100 focus:!border-deep-sage-green focus-visible:ring-offset-0 focus-visible:ring-0' />
                    <PackageSearchIcon className='text-deep-sage-green-700 absolute left-3 top-1/2 transform -translate-y-1/2 text-black' />
                </div>
                {user && !hasPermission(user || { id: '1', name: 'Guest', role: 'Staff' }, 'create:inventory') ? null : (
                    <>
                        <Button 
                        variant='outline' 
                        className='bg-deep-sage-green-800 text-white hover:bg-deep-sage-green-600 hover:text-white cursor-pointer'
                        onClick={() => setIsDialogOpen(!isDialogOpen)}>
                            <PlusIcon />
                            Add Medicine
                        </Button>
                        {isDialogOpen ? <AddMedicineDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} /> : null}
                    </>
                )}
            </div>
            <div className='rounded-md border mx-4 mb-4'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className='font-primary font-bold text-muted-foreground' key={header.id}>
                                            {header.isPlaceholder
                                            ? null 
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className='max-h-[300px]'>
                        {table.getPaginationRowModel().rows?.length ? (
                            <>
                            {table.getPaginationRowModel().rows.map((row) => (
                                <TableRow className='font-secondary hover:bg-deep-sage-green-50' key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell  key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                            {Array.from({ length: pagination.pageSize - table.getPaginationRowModel().rows.length}).map((_, index) => (
                                <TableRow key={`empty-row-${index}`}>
                                    <TableCell className='h-10.5' colSpan={columns.length} />
                                </TableRow>
                            ))}
                            </>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    No data available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className='flex items-center justify-end space-x-3 mx-4 mb-15'>
                <div className='flex gap-2'>
                    <Button className='bg-deep-sage-green-700 font-secondary text-white group hover:bg-deep-sage-green hover:text-white' variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    <ArrowLeftIcon className='text-white transition-all duration-300 group-hover:-translate-x-1' />
                    Previous
                </Button>
                <Button className='font-secondary text-black' variant='outline' size='sm'>
                    <BookOpenIcon className='text-deep-sage-green-700' />
                    Page: 
                    <span className='text-black'>{table.getState().pagination.pageIndex + 1}</span>
                </Button>
                <Button className='bg-deep-sage-green-700 font-secondary text-white group hover:bg-deep-sage-green hover:text-white' variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                    <ArrowRightIcon className='text-white transition-all duration-300 group-hover:translate-x-1' />
                </Button>
                </div>
            </div>
        </>
    )
}

export default DataTable