import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type ColumnFiltersState, flexRender, getCoreRowModel, useReactTable, type ColumnDef, getFilteredRowModel, getPaginationRowModel, type PaginationState } from '@tanstack/react-table';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, BookOpenIcon, CirclePlusIcon, TextSearchIcon } from 'lucide-react';
import React from 'react';
import TotalOrdersCard from './sub-components/total-orders-card';
import TotalRevenueCard from './sub-components/total-revenue-card';
import CreateOrderSheet from './sub-components/create-order-sheet';

interface OrderDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

const OrderDataTable = <TData, TValue>({
    columns,
    data,
}: OrderDataTableProps<TData, TValue>) => {
    const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>([])
    const [ isSheetOpen, setIsSheetOpen ] = React.useState(false);
    const [ pagination, setPagination ] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 15,
    })

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            columnFilters,
            pagination,
        },
    })

    return (
        <>
            <div className='flex flex-col items-left m-4 gap-1'>
                <h1 className='font-primary font-semibold text-2xl font-black text-deep-sage-green-800'>Orders</h1>
                <h1 className='font-primary font-normal text-xs text-muted-foreground'>
                    View and manage all orders placed within the pharmacy.
                </h1>

                <div className='flex flex-row justify-between w-full gap-3'>
                    <TotalOrdersCard />
                    <TotalRevenueCard />
                </div>

                <div className='flex flex-row items-center gap-2 mt-5'>
                    <div className='relative min-w-xs'>
                        <Input 
                        placeholder='Find order' 
                        value={(table.getColumn('orderId')?.getFilterValue() as string) ?? ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => table.getColumn('orderId')?.setFilterValue(e.target.value)}
                        className='font-secondary font-normal text-black px-10 ring-0 border-2 border-deep-sage-green-100 focus:!border-deep-sage-green-800 focus-visible:ring-offset-0 focus-visible:ring-0' />
                        <TextSearchIcon className='text-deep-sage-green-700 absolute left-3 top-1/2 transform -translate-y-1/2 text-deep-sage-green-800 ' />
                    </div>
                    <Button 
                    variant='outline' 
                    className='font-secondary bg-deep-sage-green-700 text-white hover:bg-deep-sage-green hover:text-white cursor-pointer'
                    onClick={() => setIsSheetOpen(!isSheetOpen)}>
                        <CirclePlusIcon />
                        Create order
                    </Button>
                    <CreateOrderSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
                </div>
            </div>
            <div className='rounded-md border mx-4 mb-5'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className='p-10'>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className='font-bold text-muted-foreground' key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(
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
                                    <TableRow className='hover:bg-deep-sage-green-50' key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className='h-10.5'>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                                {Array.from({ length: pagination.pageSize - table.getPaginationRowModel().rows.length }).map((_, index) => (
                                    <TableRow key={`empty-row-${index}`}>
                                        <TableCell colSpan={columns.length} className='h-10.5' />
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
                    <ArrowLeftCircleIcon className='text-white transition-all duration-300 group-hover:-translate-x-1' />
                    Previous
                </Button>
                <Button className='font-secondary text-black' variant='outline' size='sm'>
                    <BookOpenIcon className='text-deep-sage-green-700' />
                    Page: 
                    <span className='text-black'>{table.getState().pagination.pageIndex + 1}</span>
                </Button>
                <Button className='bg-deep-sage-green-700 font-secondary text-white group hover:bg-deep-sage-green hover:text-white' variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                    <ArrowRightCircleIcon className='text-white transition-all duration-300 group-hover:translate-x-1' />
                </Button>
                </div>
            </div>
        </>
    )
}

export default OrderDataTable;