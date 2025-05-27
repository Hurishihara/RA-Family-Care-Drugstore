import * as React from 'react'
import {
    type ColumnDef,
    type ColumnFiltersState,
    type VisibilityState,
    type SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    getSortedRowModel,
    getFilteredRowModel,
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
import { ArrowLeftIcon, ArrowRightIcon, BookOpenIcon, PackageSearchIcon, PillBottleIcon, TextSearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

const DataTable = <TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) => {
    const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>([])
    const [ sorting, setSorting ] = React.useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            columnFilters,
            sorting,
        }
    })

    const totalRows = data.length;
    const currentPage = table.getState().pagination.pageIndex;
    const currentPageSize = table.getState().pagination.pageSize;
    const startRow = currentPage * currentPageSize + 1;
    const endRow = Math.min((currentPage + 1) * currentPageSize, totalRows);

    return (
        <>
            <div className='flex flex-col items-left m-4 gap-1'>
                <h1 className='font-primary font-semibold text-2xl text-black'>Inventory Summary</h1>
                <h1 className='font-primary font-normal text-xs text-black'>View and manage all medications in your pharmacy stock</h1>
            <div className='relative max-w-xs mt-3'>
                <Input 
                placeholder='Filter by name...' 
                value={(table.getColumn('medicineName')?.getFilterValue() as string) ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => table.getColumn('medicineName')?.setFilterValue(e.target.value)}
                className='font-secondary font-normal text-black px-10 ring-0 border-2 border-deep-sage-green-100 focus:!border-deep-sage-green focus-visible:ring-offset-0 focus-visible:ring-0' />
                <PackageSearchIcon className='text-deep-sage-green-700 absolute left-3 top-1/2 transform -translate-y-1/2 text-black' />
            </div>
            </div>
            <div className='rounded-md border mx-4 mb-4'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className='bg-deep-sage-green-50' key={header.id}>
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
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell  key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
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
            <div className='flex items-center justify-end space-x-3 mx-4'>
                <div className='flex gap-2'>
                    <Button className='bg-deep-sage-green-700 font-secondary font-medium text-white group hover:bg-deep-sage-green hover:text-white' variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    <ArrowLeftIcon className='text-white transition-all duration-300 group-hover:-translate-x-1' />
                    Previous
                </Button>
                <Button className='font-secondary text-sm text-black' variant='outline' size='sm'>
                    <BookOpenIcon className='text-deep-sage-green-700' />
                    Page: 
                    <span className='text-black'>{table.getState().pagination.pageIndex + 1}</span>
                </Button>
                <Button className='bg-deep-sage-green-700 font-secondary font-medium text-white group hover:bg-deep-sage-green hover:text-white' variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                    <ArrowRightIcon className='text-white transition-all duration-300 group-hover:translate-x-1' />
                </Button>
                </div>
            </div>
        </>
    )
}

export default DataTable