
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { JobApplication } from '@/types';

interface SourceSuccessChartProps {
  applications: JobApplication[];
}

const SourceSuccessChart: React.FC<SourceSuccessChartProps> = ({ applications }) => {
  const sourceStats = applications.reduce((acc, app) => {
    const source = app.source || 'Unknown';
    if (!acc[source]) {
      acc[source] = { total: 0, offers: 0 };
    }
    acc[source].total++;
    if (app.status === 'Offer') {
      acc[source].offers++;
    }
    return acc;
  }, {} as Record<string, { total: number; offers: number }>);

  const data = Object.entries(sourceStats).map(([source, stats]) => ({
    source,
    successRate: (stats.offers / stats.total) * 100,
    applications: stats.total,
  }));

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Success Rate by Source</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="source" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="successRate" fill="#10b981" name="Success Rate %" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SourceSuccessChart;
