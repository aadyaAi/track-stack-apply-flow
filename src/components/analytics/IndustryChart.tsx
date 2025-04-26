
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { JobApplication } from '@/types';

interface IndustryChartProps {
  applications: JobApplication[];
}

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#ef4444', '#f59e0b', '#6b7280'];

const IndustryChart: React.FC<IndustryChartProps> = ({ applications }) => {
  const roleStats = applications.reduce((acc, app) => {
    const role = app.roleName.toLowerCase();
    let category = 'Other';
    
    if (role.includes('engineer') || role.includes('developer')) category = 'Engineering';
    else if (role.includes('data') || role.includes('analyst')) category = 'Data';
    else if (role.includes('product')) category = 'Product';
    else if (role.includes('design')) category = 'Design';
    else if (role.includes('manager')) category = 'Management';
    
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(roleStats)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Role Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default IndustryChart;
