import * as React from 'react';
import { inventoryColumns } from '../inventory/columns';
import DataTable from '../inventory/data-table';
import { useAuth } from '@/hooks/auth.hook';
import { hasPermission } from '@/utils/permission';
import { api } from '@/utils/axios.config';
import type { medicineType } from '@/types/medicine.type';

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
         console.error('Error fetching inventory data:', err);
        }
      }
      getMedicineInventory();
    }, [])

    return (
        <DataTable columns={filteredInventoryColumns} data={data} />
    )
}

export default CustomInventoryTablePage;
