import { Pie, PieChart } from 'recharts'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartData = [
  { paymentMethod: 'GCash', orders: 275, fill: '#2c503b' },
  { paymentMethod: 'Cash', orders: 200, fill: '#3f7353' },
]

const chartConfig = {
  orders: {
    label: 'Orders',
  },
  GCash: {
    label: 'GCash',
    color: '#254031',
  },
  Cash: {
    label: 'Cash',
    color: '#3f735',
  },
} satisfies ChartConfig

const RevenuePieChart = () => {
    return (
        <ChartContainer
        config={chartConfig}
        className='w-[400px]'>
          <PieChart>
            <Pie data={chartData} dataKey='orders' />
            <ChartLegend 
            content={<ChartLegendContent nameKey='paymentMethod' />} 
            className='-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center text-muted-foreground font-bold font-primary' />
          </PieChart>
        </ChartContainer>
    )
}
export default RevenuePieChart;