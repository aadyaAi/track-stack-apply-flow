
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { JobApplication } from '@/types';

interface StatusChartProps {
  applications: JobApplication[];
}

const COLORS = {
  'Applied': '#3b82f6',     // Blue
  'Interviewing': '#8b5cf6', // Purple
  'Offer': '#10b981',       // Green
  'Rejected': '#ef4444',    // Red
  'Ghosted': '#6b7280',     // Gray
};

const StatusChart: React.FC<StatusChartProps> = ({ applications }) => {
  // Count applications by status
  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Convert to array for recharts
  const data = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Application Status</CardTitle>
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
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#000000'} />
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

export default StatusChart;
