
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { JobApplication } from '@/types';
import { format } from 'date-fns';

interface ApplicationTimelineProps {
  applications: JobApplication[];
}

const ApplicationTimeline: React.FC<ApplicationTimelineProps> = ({ applications }) => {
  const timelineData = applications.reduce((acc: Record<string, number>, app) => {
    const date = format(new Date(app.applicationDate), 'MMM d');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(timelineData).map(([date, count]) => ({
    date,
    applications: count,
  }));

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Application Timeline</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="applications" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ApplicationTimeline;
