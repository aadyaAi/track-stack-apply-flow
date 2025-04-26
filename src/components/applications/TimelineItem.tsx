
import React from 'react';
import { TimelineEvent } from '@/types';
import { formatDate } from '@/utils/format-date';
import { Button } from '@/components/ui/button';
import { Trash, Calendar, ChevronRight } from 'lucide-react';
import { useApplications } from '@/context/ApplicationContext';
import { cn } from '@/lib/utils';

interface TimelineItemProps {
  event: TimelineEvent;
  applicationId: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ event, applicationId }) => {
  const { deleteTimelineEvent } = useApplications();
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div 
      className={cn(
        "mb-4 relative pl-8 pb-4 border-l border-gray-200 transition-all duration-300",
        "hover:pl-10 group"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={cn(
          "absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500",
          "flex items-center justify-center transition-all duration-300",
          "group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-200"
        )}
      >
        <Calendar className="w-2 h-2 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="relative">
        <ChevronRight 
          className={cn(
            "absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500",
            "opacity-0 group-hover:opacity-100 transition-opacity",
            "transform group-hover:translate-x-1"
          )}
        />
        
        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-gray-100 transition-all duration-300 group-hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-blue-600">
                {formatDate(event.date)}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {event.description}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => deleteTimelineEvent(applicationId, event.id)}
              className={cn(
                "h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity",
                "hover:bg-red-50 hover:text-red-500"
              )}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
