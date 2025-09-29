import RevenuePieChart from '@/charts/revenue-pie-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/auth.hook';
import { useApiQuery } from '@/hooks/use-api';
import { type PieChartDashboardAPIResponse, type SelectTimeframe } from '@/types/chart.type';
import type { ErrorResponse } from '@/types/error.response';
import { getPercentageChange } from '@/utils/helper';
import axios from 'axios';
import { ArrowDownIcon, ArrowUpIcon, CircleXIcon, MoveRightIcon, WifiOffIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

const TotalRevenueCard = () => { 

    const [timeframe, setTimeframe] = React.useState<SelectTimeframe>('day');
    const { user } = useAuth();

    const { data, isPending, error, isSuccess, isError } = useApiQuery<PieChartDashboardAPIResponse>({
        url: '/chart/pie-chart-data',
        queryKey: ['pie-chart'],
        options: {
            enabled: user !== null, // only run the query if user is defined
            retry: 1,
            staleTime: 1000 * 60 * 10, // Stale after 10 minutes
            gcTime: 1000 * 60 * 30 // Cache for 30 minutes
        }
    })

    if (isPending) {
        return (
            <div>
                Loading....
            </div>
        )
    }

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
        return;
    }

    const currentPercentageChange = getPercentageChange(
        data && isSuccess ? data.PieChartDashboardStats[timeframe].previousTotalRevenue : 0,
        data && isSuccess ? data.PieChartDashboardStats[timeframe].currentTotalRevenue : 0
    );

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
                    <div className='base:text-3xl md:text-5xl font-primary font-bold text-deep-sage-green-800'>
                        {data && isSuccess ? `₱${data.PieChartDashboardStats[timeframe].currentTotalRevenue}`: '₱0.00'}
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
               <RevenuePieChart filter={timeframe} data={isSuccess && data ? data.PieChartData : { day: [], week: [], month: [] }}/>
            </CardContent>
        </Card>
    )
}

export default TotalRevenueCard;