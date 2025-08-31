import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'A bar chart'

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2c503b',
  },
} satisfies ChartConfig

const OrderBarChart = () => {
  return (
    <ChartContainer config={chartConfig} className='w-[400px]'>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='month'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey='desktop' fill='#2c503b' radius={8} />
      </BarChart>
    </ChartContainer>
  )
}

export default OrderBarChart