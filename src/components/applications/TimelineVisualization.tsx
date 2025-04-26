
import React from 'react';
import { TimelineEvent } from '@/types';
import { formatDate } from '@/utils/format-date';
import { getStatusColor } from '@/utils/status-utils';

interface TimelineVisualizationProps {
  timeline: TimelineEvent[];
  status: string;
}

const TimelineVisualization: React.FC<TimelineVisualizationProps> = ({ timeline, status }) => {
  const sortedEvents = [...timeline].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="relative pt-8 pb-4">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200" />
      
      {/* Events */}
      {sortedEvents.map((event, index) => (
        <div
          key={event.id}
          className={`relative flex items-center mb-8 ${
            index % 2 === 0 ? 'flex-row-reverse' : ''
          }`}
        >
          {/* Event content */}
          <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
            <p className="font-medium">{event.description}</p>
            <p className="text-sm text-gray-500">{formatDate(event.date)}</p>
          </div>
          
          {/* Event marker */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white bg-blue-500 shadow" />
        </div>
      ))}
      
      {/* Current status marker */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <div className={`w-6 h-6 rounded-full ${getStatusColor(status)} shadow-lg`} />
      </div>
    </div>
  );
};

export default TimelineVisualization;
