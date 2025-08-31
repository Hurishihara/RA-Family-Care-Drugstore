import React from 'react';
import { orderColumns } from '../orders/columns';
import OrderDataTable from '../orders/orders-data-table';
import type { Order } from '@/types/order.type';

const sampleOrdersData = async (): Promise<Order[]> => {
    return Promise.resolve([
        {
            orderId: 'ORD-001',
            customer: 'John Doe',
            date: new Date('2023-10-01'),
            items: {
                'Biogesic': {
                    category: 'Analgesic',
                    quantity: 2,
                    pricePerUnit: 10.00
                },
                'Medicol Advance': {
                    category: 'Anti-inflammatory',
                    quantity: 5,
                    pricePerUnit: 15.00
                },
                'Neozep': {
                    category: 'Cold and Flu',
                    quantity: 1,
                    pricePerUnit: 20.00
                },
                'Vicks Vaporub': {
                    category: 'Cough',
                    quantity: 1,
                    pricePerUnit: 25.00
                },
                'Decolgen': {
                    category: 'Cold and Flu',
                    quantity: 1,
                    pricePerUnit: 25.00
                }
            },
            total: 95.00,  // Adjusted based on quantity and pricePerUnit
            paymentMethod: 'GCash' as Order['paymentMethod'],
            orderRepresentative: 'Stefanie Lacap'
        },
        {
            orderId: 'ORD-002',
            customer: 'Jane Smith',
            date: new Date('2023-10-02'),
            items: {
                'Paracetamol': {
                    category: 'Analgesic',
                    quantity: 3,
                    pricePerUnit: 5.00
                },
                'Ibuprofen': {
                    category: 'Anti-inflammatory',
                    quantity: 2,
                    pricePerUnit: 8.00
                }
            },
            total: 31.00,  // Adjusted based on quantity and pricePerUnit
            paymentMethod: 'Cash' as Order['paymentMethod'],
            orderRepresentative: 'Stefanie Lacap'
        },
        {
            orderId: 'ORD-003',
            customer: 'Mike Johnson',
            date: new Date('2023-10-03'),
            items: {
                'Aspirin': {
                    category: 'Analgesic',
                    quantity: 1,
                    pricePerUnit: 3.00
                },
                'Cough Syrup': {
                    category: 'Cough',
                    quantity: 2,
                    pricePerUnit: 12.00
                },
                'Nasal Spray': {
                    category: 'Allergy',
                    quantity: 1,
                    pricePerUnit: 10.00
                }
            },
            total: 27.00,  // Adjusted based on quantity and pricePerUnit
            paymentMethod: 'Cash' as Order['paymentMethod'],
            orderRepresentative: 'Marianne Lacap'
        },
        {
            orderId: 'ORD-004',
            customer: 'Emily Davis',
            date: new Date('2023-10-04'),
            items: {
                'Antihistamine': {
                    category: 'Allergy',
                    quantity: 3,
                    pricePerUnit: 7.00
                },
                'Vitamin C': {
                    category: 'Supplements',
                    quantity: 4,
                    pricePerUnit: 4.00
                },
                'Zinc Tablets': {
                    category: 'Supplements',
                    quantity: 2,
                    pricePerUnit: 5.00
                },
                'Cough Drops': {
                    category: 'Cough',
                    quantity: 1,
                    pricePerUnit: 6.00
                }
            },
            total: 43.00,  // Adjusted based on quantity and pricePerUnit
            paymentMethod: 'GCash' as Order['paymentMethod'],
            orderRepresentative: 'Stefanie Lacap'
        },
        {
            orderId: 'ORD-005',
            customer: 'David Wilson',
            date: new Date('2023-10-05'),
            items: {
                'Antacid': {
                    category: 'Digestive',
                    quantity: 2,
                    pricePerUnit: 6.00
                },
                'Laxative': {
                    category: 'Digestive',
                    quantity: 1,
                    pricePerUnit: 10.00
                },
                'Probiotic': {
                    category: 'Supplements',
                    quantity: 1,
                    pricePerUnit: 6.00
                }
            },
            total: 22.00,  // Adjusted based on quantity and pricePerUnit
            paymentMethod: 'Cash' as Order['paymentMethod'],
            orderRepresentative: 'Marianne Lacap'
        },
        {
            orderId: 'ORD-006',
            customer: 'Sarah Brown',
            date: new Date('2023-10-06'),
            items: {
                'Pain Relief Gel': {
                    category: 'Analgesic',
                    quantity: 1,
                    pricePerUnit: 15.00
                },
                'Muscle Relaxant': {
                    category: 'Muscle Pain',
                    quantity: 2,
                    pricePerUnit: 12.00
                },
                'Heat Patch': {
                    category: 'Muscle Pain',
                    quantity: 3,
                    pricePerUnit: 8.00
                }
            },
            total: 55.00,  // Adjusted based on quantity and pricePerUnit
            paymentMethod: 'GCash' as Order['paymentMethod'],
            orderRepresentative: 'Stefanie Lacap'
        },
        {
            orderId: 'ORD-007',
            customer: 'Chris Green',
            date: new Date('2023-10-07'),
            items: {
                'Allergy Relief': {
                    category: 'Allergy',
                    quantity: 2,
                    pricePerUnit: 9.00
                },
                'Decongestant': {
                    category: 'Cold and Flu',
                    quantity: 1,
                    pricePerUnit: 11.00
                }
            },
            total: 29.00,  // Adjusted based on quantity and pricePerUnit
            paymentMethod: 'Cash' as Order['paymentMethod'],
            orderRepresentative: 'Marianne Lacap'
        },
        {
            orderId: 'ORD-008',
            customer: 'Laura White',
            date: new Date('2023-10-08'),
            items: {
                'Sleep Aid': {
                    category: 'Sleep',
                    quantity: 1,
                    pricePerUnit: 20.00
                },
                'Melatonin': {
                    category: 'Sleep',
                    quantity: 2,
                    pricePerUnit: 12.00
                },
                'Chamomile Tea': {
                    category: 'Relaxant',
                    quantity: 3,
                    pricePerUnit: 5.00
                }
            },
            total: 59.00,  // Adjusted based on quantity and pricePerUnit
            paymentMethod: 'GCash' as Order['paymentMethod'],
            orderRepresentative: 'Stefanie Lacap'
        },
        {
            orderId: 'ORD-009',
            customer: 'James Black',
            date: new Date('2023-10-09'),
            items: {
                'Blood Pressure Monitor': {
                    category: 'Medical Device',
                    quantity: 1,
                    pricePerUnit: 50.00
                },
                'Glucose Meter': {
                    category: 'Medical Device',
                    quantity: 1,
                    pricePerUnit: 40.00
                }
            },
            total: 90.00,  // Adjusted based on quantity and pricePerUnit
            paymentMethod: 'Cash' as Order['paymentMethod'],
            orderRepresentative: 'Marianne Lacap'
        },
        {
            orderId: 'ORD-010',
            customer: 'Patricia Gray',
            date: new Date('2023-10-10'),
            items: {
                'First Aid Kit': {
                    category: 'Medical Supplies',
                    quantity: 1,
                    pricePerUnit: 30.00
                },
                'Bandages': {
                    category: 'Medical Supplies',
                    quantity: 5,
                    pricePerUnit: 3.00
                },
                'Antiseptic Cream': {
                    category: 'Medical Supplies',
                    quantity: 2,
                    pricePerUnit: 7.00
                }
            },
            total: 61.00,  // Adjusted based on quantity and pricePerUnit
            paymentMethod: 'GCash' as Order['paymentMethod'],
            orderRepresentative: 'Stefanie Lacap'
        },
        {
            orderId: 'ORD-011',
            customer: 'Robert Blue',
            date: new Date('2023-10-11'),
            items: {
                'Hydrocortisone Cream': {
                    category: 'Skin Care',
                    quantity: 1,
                    pricePerUnit: 12.00
                },
                'Moisturizing Lotion': {
                    category: 'Skin Care',
                    quantity: 2,
                    pricePerUnit: 10.00
                }
            },
            total: 32.00,  // Adjusted based on quantity and pricePerUnit
            paymentMethod: 'Cash' as Order['paymentMethod'],
            orderRepresentative: 'Marianne Lacap'
        },
        {
            orderId: 'ORD-012',
            customer: 'Emily Johnson',
            date: new Date('2023-10-12'),
            items: {
              'Paracetamol': { category: 'Medicine', quantity: 2, pricePerUnit: 5.5 },
              'Vitamin C': { category: 'Supplements', quantity: 1, pricePerUnit: 8.0 }
            },
            total: 19.0,
            paymentMethod: 'Cash' as Order['paymentMethod'],
            orderRepresentative: 'Stefanie Lacap'
        },
        {
            orderId: 'ORD-013',
            customer: 'David Smith',
            date: new Date('2023-10-15'),
            items: {
              'Cough Syrup': { category: 'Medicine', quantity: 1, pricePerUnit: 7.0 },
              'Face Mask Pack': { category: 'Health Supplies', quantity: 3, pricePerUnit: 2.5 }
            },
            total: 14.5,
            paymentMethod: 'Cash' as Order['paymentMethod'],
            orderRepresentative: 'Marianne Lacap'
        },
        {
            orderId: 'ORD-014',
            customer: 'Sophia Lee',
            date: new Date('2023-10-18'),
            items: {
              'Sunscreen SPF50': { category: 'Skin Care', quantity: 2, pricePerUnit: 15.0 }
            },
            total: 30.0,
            paymentMethod: 'GCash' as Order['paymentMethod'],
            orderRepresentative: 'Marianne Lacap'
        },
        {
            orderId: 'ORD-015',
            customer: 'Michael Brown',
            date: new Date('2023-10-20'),
            items: {
              'Aspirin': { category: 'Medicine', quantity: 1, pricePerUnit: 4.0 },
              'Hand Sanitizer': { category: 'Health Supplies', quantity: 2, pricePerUnit: 3.5 },
              'Lip Balm': { category: 'Skin Care', quantity: 1, pricePerUnit: 2.5 }
            },
            total: 13.5,
            paymentMethod: 'GCash' as Order['paymentMethod'],
            orderRepresentative: 'Stefanie Lacap'
        },
        {
            orderId: 'ORD-016',
            customer: 'Olivia Martinez',
            date: new Date('2023-10-22'),
            items: {
              'Collagen Supplement': { category: 'Supplements', quantity: 1, pricePerUnit: 20.0 },
              'Aloe Vera Gel': { category: 'Skin Care', quantity: 1, pricePerUnit: 9.5 }
            },
            total: 29.5,
            paymentMethod: 'Cash' as Order['paymentMethod'],
            orderRepresentative: 'Marianne Lacap'
        },
        {
            orderId: 'ORD-017',
            customer: 'Daniel Garcia',
            date: new Date('2023-10-25'),
            items: {
              'Fish Oil Capsules': { category: 'Supplements', quantity: 2, pricePerUnit: 12.0 }
            },
            total: 24.0,
            paymentMethod: 'GCash' as Order['paymentMethod'],
            orderRepresentative: 'Marianne Lacap'
        },
        {
            orderId: 'ORD-018',
            customer: 'Isabella Davis',
            date: new Date('2023-10-27'),
            items: {
              'Calcium Tablets': { category: 'Supplements', quantity: 1, pricePerUnit: 11.0 },
              'Herbal Tea Pack': { category: 'Health Supplies', quantity: 2, pricePerUnit: 6.5 }
            },
            total: 24.0,
            paymentMethod: 'GCash' as Order['paymentMethod'],
            orderRepresentative: 'Stefanie Lacap'
        },
        {
            orderId: 'ORD-019',
            customer: 'James Wilson',
            date: new Date('2023-10-30'),
            items: {
              'Pain Relief Spray': { category: 'Medicine', quantity: 1, pricePerUnit: 9.0 },
              'Multivitamins': { category: 'Supplements', quantity: 2, pricePerUnit: 13.0 }
            },
            total: 35.0,
            paymentMethod: 'Cash' as Order['paymentMethod'],
            orderRepresentative: 'Stefanie Lacap'
        },
        {
            orderId: 'ORD-020',
            customer: 'Mia Taylor',
            date: new Date('2023-11-02'),
            items: {
              'Shampoo': { category: 'Skin Care', quantity: 1, pricePerUnit: 7.5 },
              'Conditioner': { category: 'Skin Care', quantity: 1, pricePerUnit: 7.5 },
              'Body Wash': { category: 'Skin Care', quantity: 1, pricePerUnit: 6.0 }
            },
            total: 21.0,
            paymentMethod: 'Cash' as Order['paymentMethod'],
            orderRepresentative: 'Marianne Lacap'
        },
        {
            orderId: 'ORD-021',
            customer: 'Benjamin Clark',
            date: new Date('2023-11-05'),
            items: {
              'First Aid Kit': { category: 'Health Supplies', quantity: 1, pricePerUnit: 25.0 },
              'Hand Cream': { category: 'Skin Care', quantity: 2, pricePerUnit: 4.5 }
            },
            total: 34.0,
            paymentMethod: 'GCash' as Order['paymentMethod'],
            orderRepresentative: 'Stefanie Lacap'
        }
    ]).then((orders) => {
        return orders.map(order => ({
            ...order,
            items: Object.fromEntries(Object.entries(order.items).filter(([_, value]) => value !== undefined))
        }))
    });
}

const CustomOrdersTablePage = () => {
    const [orders, setOrders] = React.useState<Order[]>([]);

    React.useEffect(() => {
        const getOrder = async () => {
            try {
                const res = await sampleOrdersData();
                setOrders(res);
            }
            catch (err) {
                console.error('Error fetching order data:', err);
            }
        }
        getOrder();
    }, [])

    return (
        <OrderDataTable columns={orderColumns} data={orders} />
    )
}

export default CustomOrdersTablePage;