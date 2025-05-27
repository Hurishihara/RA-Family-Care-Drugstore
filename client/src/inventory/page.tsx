import * as React from 'react';
import { type InventoryItem, inventoryColumns } from './columns';
import DataTable from './data-table';

const CustomInventoryTablePage = () => {
    const [data, setData] = React.useState<InventoryItem[]>([]);
    React.useEffect(() => {
        const getData = async (): Promise<InventoryItem[]> => {
            return [
                {
                  "id": "1",
                  "medicineName": "Biogesic",
                  "category": "Analgesic",
                  "quantity": 120,
                  "pricePerUnit": 3.5,
                  "costPerUnit": 2.1,
                  "expiryDate": "2026-01-15",
                  "expirationDate": "2026-01-15",
                  "dateReceived": "2025-05-10"
                },
                {
                  "id": "2",
                  "medicineName": "Medicol Advance",
                  "category": "Anti-inflammatory",
                  "quantity": 80,
                  "pricePerUnit": 5.25,
                  "costPerUnit": 3.1,
                  "expiryDate": "2025-12-01",
                  "expirationDate": "2025-12-01",
                  "dateReceived": "2025-04-22"
                },
                {
                  "id": "3",
                  "medicineName": "Neozep",
                  "category": "Cold Medicine",
                  "quantity": 200,
                  "pricePerUnit": 6.0,
                  "costPerUnit": 4.0,
                  "expiryDate": "2026-06-30",
                  "expirationDate": "2026-06-30",
                  "dateReceived": "2025-06-01"
                },
                {
                  "id": "4",
                  "medicineName": "Bioflu",
                  "category": "Cold Medicine",
                  "quantity": 150,
                  "pricePerUnit": 5.75,
                  "costPerUnit": 3.85,
                  "expiryDate": "2026-02-15",
                  "expirationDate": "2026-02-15",
                  "dateReceived": "2025-04-15"
                },
                {
                  "id": "5",
                  "medicineName": "Kremil-S",
                  "category": "Antacid",
                  "quantity": 90,
                  "pricePerUnit": 4.5,
                  "costPerUnit": 2.9,
                  "expiryDate": "2025-11-20",
                  "expirationDate": "2025-11-20",
                  "dateReceived": "2025-03-01"
                },
                {
                  "id": "6",
                  "medicineName": "Loperamide",
                  "category": "Antidiarrheal",
                  "quantity": 70,
                  "pricePerUnit": 2.75,
                  "costPerUnit": 1.8,
                  "expiryDate": "2026-03-10",
                  "expirationDate": "2026-03-10",
                  "dateReceived": "2025-05-05"
                },
                {
                  "id": "7",
                  "medicineName": "Amoxicillin",
                  "category": "Antibiotic",
                  "quantity": 50,
                  "pricePerUnit": 7.0,
                  "costPerUnit": 4.9,
                  "expiryDate": "2026-07-01",
                  "expirationDate": "2026-07-01",
                  "dateReceived": "2025-06-15"
                },
                {
                  "id": "8",
                  "medicineName": "Salbutamol",
                  "category": "Bronchodilator",
                  "quantity": 60,
                  "pricePerUnit": 5.8,
                  "costPerUnit": 3.6,
                  "expiryDate": "2025-10-05",
                  "expirationDate": "2025-10-05",
                  "dateReceived": "2025-02-20"
                },
                {
                  "id": "9",
                  "medicineName": "Mefenamic Acid",
                  "category": "Pain Reliever",
                  "quantity": 130,
                  "pricePerUnit": 4.95,
                  "costPerUnit": 3.2,
                  "expiryDate": "2026-04-01",
                  "expirationDate": "2026-04-01",
                  "dateReceived": "2025-04-01"
                },
                {
                  "id": "10",
                  "medicineName": "Cetirizine",
                  "category": "Antihistamine",
                  "quantity": 110,
                  "pricePerUnit": 3.25,
                  "costPerUnit": 2.0,
                  "expiryDate": "2026-08-15",
                  "expirationDate": "2026-08-15",
                  "dateReceived": "2025-05-18"
                },
                {
                  id: "11",
                  medicineName: "Alaxan FR",
                  category: "Pain Reliever",
                  quantity: 95,
                  pricePerUnit: 6.25,
                  costPerUnit: 4.0,
                  expiryDate: "2026-05-12",
                  expirationDate: "2026-05-12",
                  dateReceived: "2025-04-05"
                },
                {
                  id: "12",
                  medicineName: "Decolgen",
                  category: "Cold Medicine",
                  quantity: 140,
                  pricePerUnit: 5.6,
                  costPerUnit: 3.7,
                  expiryDate: "2026-01-01",
                  expirationDate: "2026-01-01",
                  dateReceived: "2025-03-25"
                },
                {
                  id: "13",
                  medicineName: "RiteMed Paracetamol",
                  category: "Analgesic",
                  quantity: 180,
                  pricePerUnit: 2.95,
                  costPerUnit: 1.6,
                  expiryDate: "2025-12-20",
                  expirationDate: "2025-12-20",
                  dateReceived: "2025-05-01"
                },
                {
                  id: "14",
                  medicineName: "Diatabs",
                  category: "Antidiarrheal",
                  quantity: 75,
                  pricePerUnit: 3.15,
                  costPerUnit: 2.1,
                  expiryDate: "2026-07-08",
                  expirationDate: "2026-07-08",
                  dateReceived: "2025-06-20"
                },
                {
                  id: "15",
                  medicineName: "Zertin",
                  category: "Antihistamine",
                  quantity: 85,
                  pricePerUnit: 4.3,
                  costPerUnit: 2.75,
                  expiryDate: "2026-03-18",
                  expirationDate: "2026-03-18",
                  dateReceived: "2025-05-22"
                },
                {
                  id: "16",
                  medicineName: "Dolfenal",
                  category: "Pain Reliever",
                  quantity: 100,
                  pricePerUnit: 5.85,
                  costPerUnit: 3.9,
                  expiryDate: "2026-06-30",
                  expirationDate: "2026-06-30",
                  dateReceived: "2025-05-08"
                },
                {
                  id: "17",
                  medicineName: "Hyoscine",
                  category: "Antispasmodic",
                  quantity: 60,
                  pricePerUnit: 3.9,
                  costPerUnit: 2.6,
                  expiryDate: "2026-02-12",
                  expirationDate: "2026-02-12",
                  dateReceived: "2025-03-19"
                },
                {
                  id: "18",
                  medicineName: "Simvastatin",
                  category: "Cholesterol",
                  quantity: 70,
                  pricePerUnit: 6.4,
                  costPerUnit: 4.1,
                  expiryDate: "2026-10-10",
                  expirationDate: "2026-10-10",
                  dateReceived: "2025-05-17"
                },
                {
                  id: "19",
                  medicineName: "Metformin",
                  category: "Diabetes",
                  quantity: 90,
                  pricePerUnit: 3.75,
                  costPerUnit: 2.5,
                  expiryDate: "2026-04-22",
                  expirationDate: "2026-04-22",
                  dateReceived: "2025-06-03"
                },
                {
                  id: "20",
                  medicineName: "Losartan",
                  category: "Antihypertensive",
                  quantity: 65,
                  pricePerUnit: 5.4,
                  costPerUnit: 3.5,
                  expiryDate: "2026-08-01",
                  expirationDate: "2026-08-01",
                  dateReceived: "2025-04-30"
                }
            ]
        }
        getData().then(setData);
    }, [])
    return (
        <DataTable columns={inventoryColumns} data={data} />
    )
}

export default CustomInventoryTablePage;
