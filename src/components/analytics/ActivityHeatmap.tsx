
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JobApplication } from '@/types';
import { format, parseISO, eachDayOfInterval, subMonths } from 'date-fns';

interface ActivityHeatmapProps {
  applications: JobApplication[];
}

const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ applications }) => {
  const today = new Date();
  const sixMonthsAgo = subMonths(today, 6);
  
  const activityMap = applications.reduce((acc, app) => {
    const date = format(parseISO(app.applicationDate), 'yyyy-MM-dd');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const days = eachDayOfInterval({ start: sixMonthsAgo, end: today });

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Application Activity</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-53 gap-1 p-4">
        {days.map(day => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const count = activityMap[dateStr] || 0;
          const opacity = count > 0 ? Math.min(count / 3, 1) : 0;
          
          return (
            <div
              key={dateStr}
              className="w-3 h-3 rounded-sm"
              style={{ 
                backgroundColor: `rgba(59, 130, 246, ${opacity})`,
                title: `${format(day, 'MMM d, yyyy')}: ${count} applications`
              }}
            />
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ActivityHeatmap;
