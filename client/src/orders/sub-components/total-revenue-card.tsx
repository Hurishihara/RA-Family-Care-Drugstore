import RevenuePieChart from '@/charts/revenue-pie-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpIcon } from 'lucide-react';
import React from 'react';

type SelectTimeframe = 'day' | 'week' | 'month';

const TotalRevenueCard = () => {

    const [timeframe, setTimeframe] = React.useState<SelectTimeframe>('day');

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
                        ₱25,024.89
                    </div>
                    <div className='flex flex-row items-center text-sm font-primary font-bold mt-3'>
                        <div>
                            <ArrowUpIcon className='h-3.5 w-3.5 text-deep-sage-green-600' />
                        </div>
                        <div className='text-deep-sage-green-600'>
                            +5.4%
                        </div>
                    </div>
                    <div>
                        <div className='text-muted-foreground text-xs font-primary font-medium'>
                            {timeframe === 'day' ? 'from yesterday' : timeframe === 'week' ? 'from last week' : 'from last month'}
                        </div>
                    </div>
               </div>
               <RevenuePieChart />
            </CardContent>
        </Card>
    )
}

export default TotalRevenueCard;