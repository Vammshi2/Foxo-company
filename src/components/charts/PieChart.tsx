import React from 'react';
import { PieChart as ReChartsPie, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';
import { ChartData } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import ChartCard from './ChartCard';

interface PieChartProps {
  data: ChartData[];
  title: string;
  className?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
        <p className="font-medium text-sm">{payload[0].name}</p>
        <p className="text-sm text-gray-700">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }

  return null;
};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Only show label if percentage is more than 5%
  if (percent < 0.05) return null;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartComponent: React.FC<PieChartProps> = ({ data, title, className = '' }) => {
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
        <ReChartsPie>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            formatter={(value, entry, index) => (
              <span className="text-sm text-gray-700">{value}</span>
            )}
          />
        </ReChartsPie>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default React.memo(PieChartComponent);