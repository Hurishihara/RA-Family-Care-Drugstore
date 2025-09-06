import { Pie, PieChart } from 'recharts'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import type { PieChartData, SelectTimeframe } from '@/types/chart.type'
import React from 'react'

const chartConfig = {
  Revenue: {
    label: 'Revenue',
  },
  GCash: {
    label: 'GCash',
    color: '#254031',
  },
  Cash: {
    label: 'Cash',
    color: '#3f7353',
  },
} satisfies ChartConfig

type RevenuePieChartProps = {
  filter: SelectTimeframe
  data: PieChartData
}

const RevenuePieChart = ({ filter, data }: RevenuePieChartProps) => {

  const percentageOfPaymentMethods = React.useMemo(() => {
    const total = data[filter].reduce((sum, item) => sum + item.Revenue, 0);
    return data[filter].map(item => ({
      ...item,
      percentage: total ? ((item.Revenue / total) * 100).toFixed(1) : 0
    }))
  }, [data, filter])

  return (
    <ChartContainer
    config={chartConfig}
    className='w-[400px]'>
      <PieChart>
        <Pie data={data[filter]} dataKey='Revenue' nameKey='paymentMethod' />
        <ChartTooltip content={<ChartTooltipContent hideLabel  formatter={(_, name, item) => {
          const { payload } = item;
          const percentage = percentageOfPaymentMethods.find(percent => percent.paymentMethod === name)?.percentage || 0;
          return (
            <div className='flex flex-row items-center gap-2'>
              <div className='w-2.5 h-2.5 rounded-xs' style={{ backgroundColor: payload.fill }} />
              <p className='font-primary text-xs font-semibold text-muted-foreground'>{name}</p>
              <p className='font-primary text-xs font-medium text-deep-sage-green-800 ml-3'>
                {`₱${payload.Revenue}`}
                <span className='text-xs font-primary font-normal text-muted-foreground'>
                  {` (${percentage}%)`}
                </span>
              </p>
            </div>
          )
        }} />} />
        <ChartLegend 
        content={<ChartLegendContent nameKey='paymentMethod' />} 
        className='-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center text-muted-foreground font-bold font-primary' />
      </PieChart>
    </ChartContainer>
  )
}
export default RevenuePieChart;