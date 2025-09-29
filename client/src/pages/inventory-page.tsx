import { inventoryColumns } from '../inventory/inventory-columns';
import InventoryDataTable from '../inventory/inventory-data-table';
import { useAuth } from '@/hooks/auth.hook';
import { hasPermission } from '@/utils/permission';
import type { medicineType } from '@/types/medicine.type';
import axios from 'axios';
import type { ErrorResponse } from '@/types/error.response';
import { toast } from 'sonner';
import { CircleXIcon, WifiOffIcon } from 'lucide-react';
import { useApiQuery } from '@/hooks/use-api';

const CustomInventoryTablePage = () => {
    const { user } = useAuth();

    const filteredInventoryColumns = inventoryColumns.filter(column => {
      if (column.id === 'actions' && !hasPermission(user || { id: '1', name: 'Guest', role: 'Staff' }, 'view:inventoryActions')) {
          return false;
      }
      return true;
    })

    const { data, isPending, error, isSuccess, isError } = useApiQuery<medicineType[]>({
      url: '/inventory/get-inventory',
      queryKey: ['inventory'],
      options: {
        enabled: user !== null, // only run the query if user is defined
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10, // Stale after 10 minutes
        gcTime: 1000 * 60 * 30 // Cache for 30 minutes 
      }
    })

    if (error && isError) {
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
    }
    
    return (
        <InventoryDataTable columns={filteredInventoryColumns} data={isSuccess && data ? data : []} />
    )
}

export default CustomInventoryTablePage;
