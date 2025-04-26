
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { JobApplication } from '@/types';
import { differenceInDays } from 'date-fns';

interface ResponseTimeChartProps {
  applications: JobApplication[];
}

const ResponseTimeChart: React.FC<ResponseTimeChartProps> = ({ applications }) => {
  const responseData = applications
    .filter(app => app.status !== 'Applied' && app.timeline.length > 1)
    .map(app => {
      const applyDate = new Date(app.applicationDate);
      const firstResponse = app.timeline.find(event => 
        event.description.toLowerCase().includes('interview') ||
        event.description.toLowerCase().includes('response')
      );
      const responseDays = firstResponse 
        ? differenceInDays(new Date(firstResponse.date), applyDate)
        : null;
      
      return {
        company: app.companyName,
        responseDays: responseDays,
      };
    })
    .filter(data => data.responseDays !== null)
    .sort((a, b) => (a.responseDays || 0) - (b.responseDays || 0));

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Response Time Analysis</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={responseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="company" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="responseDays" stroke="#8b5cf6" name="Days to Response" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ResponseTimeChart;
