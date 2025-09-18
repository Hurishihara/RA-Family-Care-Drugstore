import OrderBarChart from '@/charts/orders-bar-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type BarChartDashboardStats, type BarChartData, type BarChartDashboardAPIResponse, type SelectTimeframe } from '@/types/chart.type';
import type { ErrorResponse } from '@/types/error.response';
import { api } from '@/utils/axios.config';
import { getPercentageChange } from '@/utils/helper';
import axios from 'axios';
import { ArrowDownIcon, ArrowUpIcon, CircleXIcon, MoveRightIcon, WifiOffIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

const TotalOrdersCard = () => {

    const [ timeframe, setTimeframe ] = React.useState<SelectTimeframe>('day');
    const [ dashboardStats, setDashboardStats ] = React.useState<BarChartDashboardStats>({
        day: { currentTotalOrders: 0, previousTotalOrders: 0 },
        week: { currentTotalOrders: 0, previousTotalOrders: 0 },
        month: { currentTotalOrders: 0, previousTotalOrders: 0 }
    });
    const [ barChartData, setBarChartData ] = React.useState<BarChartData>({
        day: [],
        week: [],
        month: []
    })

    React.useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const { data } = await api.get<BarChartDashboardAPIResponse>('/chart/bar-chart-data');
                setDashboardStats(data.BarChartDashboardStats);
                setBarChartData(data.BarChartData);
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
        fetchDashboardStats();
    }, [])

    const currentPercentageChange = getPercentageChange(dashboardStats[timeframe].currentTotalOrders, dashboardStats[timeframe].previousTotalOrders);

    return (
        <Card className='w-full border-2 border-deep-sage-green-200 mt-4'>
            <CardHeader>
                <CardTitle className='flex justify-between items-center font-primary font-semibold text-xl text-deep-sage-green-800'>
                    Order Overview
                    <Select onValueChange={(value: SelectTimeframe) => setTimeframe(value)} value={timeframe}>
                        <SelectTrigger className='font-primary'>
                            <SelectValue placeholder={timeframe} />
                        </SelectTrigger>
                        <SelectContent align='end' className='font-primary'>
                            <SelectItem className='font-primary' value='day'>Day</SelectItem>
                            <SelectItem className='font-primary' value='week'>Week</SelectItem>
                            <SelectItem className='font-primary' value='month'>Month</SelectItem>
                        </SelectContent>
                        </Select>
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-row justify-between items-center'>
               <div>
                    <div className='text-xs font-primary font-medium text-deep-sage-green-800'>
                     Total Orders
                    </div>
                    <div className='base:text-3xl md:text-5xl font-primary font-bold text-deep-sage-green-800'>
                     {dashboardStats[timeframe].currentTotalOrders}
                    </div>
                    <div className='flex flex-row items-center text-sm font-primary font-bold mt-3'>
                        {currentPercentageChange > 0 ? (
                            <div>
                                <ArrowUpIcon className='h-3.5 w-3.5 text-deep-sage-green-600' />
                            </div>
                        ) : currentPercentageChange < 0 ? (
                            <div>
                                <ArrowDownIcon className='h-3.5 w-3.5 text-red-600' />
                            </div>
                        ) : (
                            <div>
                                <MoveRightIcon className='h-3.5 w-3.5 text-muted-foreground' />
                            </div>
                        )}
                        <div className={`${currentPercentageChange > 0 ? 'text-deep-sage-green-600' : currentPercentageChange < 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
                            {currentPercentageChange.toFixed(1)}%
                        </div>
                    </div>
                    <div>
                        <div className='text-muted-foreground text-xs font-primary font-medium'>
                            {timeframe === 'day' ? 'from yesterday' : timeframe === 'week' ? 'from last week' : 'from last month'}
                        </div>
                    </div>
               </div>
               <OrderBarChart filter={timeframe} data={barChartData} />
            </CardContent>
        </Card>
    )
}

export default TotalOrdersCard;