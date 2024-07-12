import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartProps {
  data: { name: string; proposals: number; accepted: number; value: number }[];
  dataKeys: { dataKey: string; color: string; name: string }[];
}

const Chart: React.FC<ChartProps> = ({ data, dataKeys }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
      <XAxis dataKey="name" stroke="#888" />
      <YAxis stroke="#888" />
      <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
      <Legend />
      {dataKeys.map((key, index) => (
        <Bar key={index} dataKey={key.dataKey} fill={key.color} name={key.name} />
      ))}
    </BarChart>
  </ResponsiveContainer>
);

export default Chart;