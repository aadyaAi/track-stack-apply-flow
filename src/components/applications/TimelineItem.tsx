
import React from 'react';
import { TimelineEvent } from '@/types';
import { formatDate } from '@/utils/format-date';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useApplications } from '@/context/ApplicationContext';

interface TimelineItemProps {
  event: TimelineEvent;
  applicationId: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ event, applicationId }) => {
  const { deleteTimelineEvent } = useApplications();
  
  return (
    <div className="mb-4 relative pl-6 pb-4 border-l border-gray-200">
      <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500" />
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium">{formatDate(event.date)}</p>
          <p className="text-sm text-gray-600">{event.description}</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => deleteTimelineEvent(applicationId, event.id)}
          className="h-7 w-7 p-0"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TimelineItem;
