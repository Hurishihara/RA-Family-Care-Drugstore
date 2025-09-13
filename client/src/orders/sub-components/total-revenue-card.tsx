import RevenuePieChart from '@/charts/revenue-pie-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type PieChartData, type PieChartDashboardAPIResponse, type PieChartDashboardStats, type SelectTimeframe } from '@/types/chart.type';
import type { ErrorResponse } from '@/types/error.response';
import { api } from '@/utils/axios.config';
import { getPercentageChange } from '@/utils/helper';
import axios from 'axios';
import { ArrowDownIcon, ArrowUpIcon, CircleXIcon, MoveRightIcon, WifiOffIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

const TotalRevenueCard = () => {

    const [timeframe, setTimeframe] = React.useState<SelectTimeframe>('day');
    const [ pieChartDashboardStats, setpieChartDashboardStats ] = React.useState<PieChartDashboardStats>({
        day: { currentTotalRevenue: 0, previousTotalRevenue: 0 },
        week: { currentTotalRevenue: 0, previousTotalRevenue: 0 },
        month: { currentTotalRevenue: 0, previousTotalRevenue: 0 }
    })
    const [ pieChartData, setPieChartData ] = React.useState<PieChartData>({
        day: [],
        week: [],
        month: []
    })

    React.useEffect(() => {
        const fetchTotalRevenueStats = async () => {
            try {
                const { data } = await api.get<PieChartDashboardAPIResponse>('/chart/pie-chart-data');
                setpieChartDashboardStats(data.PieChartDashboardStats);
                setPieChartData(data.PieChartData);
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
            }
        }
        fetchTotalRevenueStats();
    }, [])

    const currentPercentageChange = getPercentageChange(pieChartDashboardStats[timeframe].currentTotalRevenue, pieChartDashboardStats[timeframe].previousTotalRevenue);

    return (
        <Card className='w-full border-2 border-deep-sage-green-200 mt-4'>
            <CardHeader>
                <CardTitle className='flex justify-between items-center font-primary font-semibold text-xl text-deep-sage-green-800'>
                    Revenue Overview
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
                        Total Revenue
                    </div>
                    <div className='text-5xl font-primary font-bold text-deep-sage-green-800'>
                        {`₱${pieChartDashboardStats[timeframe].currentTotalRevenue}`}
                    </div>
                    <div className='flex flex-row gap-1 items-center text-sm font-primary font-bold mt-3'>
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
               <RevenuePieChart filter={timeframe} data={pieChartData}/>
            </CardContent>
        </Card>
    )
}

export default TotalRevenueCard;