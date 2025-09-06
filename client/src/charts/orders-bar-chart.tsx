import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { type BarChartData, type SelectTimeframe } from '@/types/chart.type'

const chartConfig = {
  Orders: {
    label: 'Total Orders',
    color: '#2c503b',
  },
} satisfies ChartConfig

type OrderBarChartProps = {
  filter: SelectTimeframe
  data: BarChartData
}

const OrderBarChart = ({ filter, data }: OrderBarChartProps) => {
  const chartData = data[filter]
  return (
    <ChartContainer config={chartConfig} className='w-[400px]'>
      <BarChart accessibilityLayer data={chartData} layout='horizontal'>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={filter === 'day' ? 'hour' : filter === 'week' ? 'day' : 'week'}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => filter === 'week' ? value.slice(0, 3) : filter === 'day' ? value.slice(0, 5) : value }
          className='font-seconday font-medium'
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent className='text-xs font-primary' indicator='line'/>}
        />
        <Bar dataKey='Orders' fill='#2c503b' radius={8} />
      </BarChart>
    </ChartContainer>
  )
}

export default OrderBarChart