import * as React from 'react';
import { inventoryColumns } from '../inventory/inventory-columns';
import DataTable from '../inventory/inventory-data-table';
import { useAuth } from '@/hooks/auth.hook';
import { hasPermission } from '@/utils/permission';
import { api } from '@/utils/axios.config';
import type { medicineType } from '@/types/medicine.type';
import axios from 'axios';
import type { ErrorResponse } from '@/types/error.response';
import { toast } from 'sonner';
import { CircleXIcon, WifiOffIcon } from 'lucide-react';

const CustomInventoryTablePage = () => {
    const [ data, setData ] = React.useState<medicineType[]>([]);
    const { user } = useAuth();

    const filteredInventoryColumns = inventoryColumns.filter(column => {
      if (column.id === 'actions' && !hasPermission(user || { id: '1', name: 'Guest', role: 'Staff' }, 'view:inventoryActions')) {
          return false;
      }
      return true;
    })

    React.useEffect(() => {
      const getMedicineInventory = async () => {
        try {
         const res = await api.get<medicineType[]>('/inventory/get-inventory');
         setData(res.data);
        }
        catch (err) {
          if (axios.isAxiosError(err)) {
            const error = err.response?.data as ErrorResponse;
            toast(error.title, {
                classNames: {
                    title: '!font-primary !font-bold !text-red-500 text-md',
                    description: '!font-primary !font-medium !text-muted-foreground text-xs'
                },
                icon: <CircleXIcon className='w-5 h-5 text-red-500' />,
                description: error.description,
            })
            return;
          }
          const error = err as ErrorResponse;
          toast(error.title, {
              classNames: {
                  title: '!font-primary !font-bold !text-red-500 text-md',
                  description: '!font-primary !font-medium !text-muted-foreground text-xs'
              },
              icon: <WifiOffIcon className='w-5 h-5 text-red-500' />,
              description: error.description,
          })
          return;
        }
      }
      getMedicineInventory();
    }, [])

    return (
        <DataTable columns={filteredInventoryColumns} data={data} />
    )
}

export default CustomInventoryTablePage;
