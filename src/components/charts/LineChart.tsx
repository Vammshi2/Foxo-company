import React from 'react';
import { 
  LineChart as ReChartsLine, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { TrendPoint } from '../../types';
import { formatCurrency, formatShortDate } from '../../utils/formatters';
import ChartCard from './ChartCard';

interface LineChartProps {
  data: TrendPoint[];
  title: string;
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
        <p className="font-medium text-sm">{formatShortDate(label)}</p>
        <p className="text-sm text-primary-600">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }

  return null;
};

const LineChartComponent: React.FC<LineChartProps> = ({ data, title, className = '' }) => {
  if (!data || data.length === 0) {
    return (
      <ChartCard title={title} className={className}>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">No data available</p>
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard title={title} className={className}>
      <ResponsiveContainer width="100%" height={300}>
        <ReChartsLine
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }} 
            tickFormatter={(value) => formatShortDate(value)} 
          />
          <YAxis 
            tickFormatter={(value) => `₹${value}`} 
            tick={{ fontSize: 12 }} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6, fill: '#1d4ed8' }}
          />
        </ReChartsLine>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default React.memo(LineChartComponent);