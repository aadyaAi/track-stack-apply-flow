
import React from 'react';
import { TimelineEvent } from '@/types';
import { formatDate } from '@/utils/format-date';
import { Card } from '@/components/ui/card';

interface TimelineVisualizationProps {
  events: TimelineEvent[];
}

const TimelineVisualization: React.FC<TimelineVisualizationProps> = ({ events }) => {
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return (
    <Card className="p-4">
      <div className="flex items-center space-x-4 overflow-x-auto pb-4">
        {sortedEvents.map((event, index) => (
          <div 
            key={event.id}
            className="flex flex-col items-center min-w-[120px]"
          >
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <div className="h-[2px] w-full bg-blue-200 relative">
              <div 
                className="absolute top-0 left-0 h-full bg-blue-500"
                style={{ width: `${((index + 1) / events.length) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">{formatDate(event.date)}</p>
            <p className="text-xs text-gray-500 mt-1 text-center w-24 truncate">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TimelineVisualization;
