
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useApplications } from '@/context/ApplicationContext';
import { Card } from '@/components/ui/card';
import { Flag, Briefcase, Building2, Calendar } from 'lucide-react';
import { ApplicationStatus, JobApplication } from '@/types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const KanbanBoard: React.FC = () => {
  const { applications, updateApplication } = useApplications();
  
  const statuses: ApplicationStatus[] = ['Applied', 'Interviewing', 'Offer', 'Rejected', 'Ghosted'];

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const { draggableId, destination } = result;
    const newStatus = destination.droppableId as ApplicationStatus;
    
    updateApplication(draggableId, { status: newStatus });
  };

  const getApplicationsByStatus = (status: ApplicationStatus) => {
    return applications.filter(app => app.status === status);
  };

  const getStatusColor = (status: ApplicationStatus) => {
    const colors = {
      'Applied': 'bg-blue-100 text-blue-800',
      'Interviewing': 'bg-purple-100 text-purple-800',
      'Offer': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Ghosted': 'bg-gray-100 text-gray-800'
    };
    return colors[status];
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 overflow-x-auto">
        {statuses.map(status => (
          <div key={status} className="flex-shrink-0 w-full sm:w-72 md:w-80">
            <div className={cn("px-3 sm:px-4 py-2 rounded-t-lg font-semibold flex items-center justify-between", getStatusColor(status))}>
              <span className="truncate">{status}</span>
              <span className="ml-2 px-2 py-1 bg-white bg-opacity-30 rounded-full text-xs sm:text-sm flex-shrink-0">
                {getApplicationsByStatus(status).length}
              </span>
            </div>
            <Droppable droppableId={status}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "bg-gray-50 rounded-b-lg p-2 sm:p-3 min-h-[200px] sm:min-h-[600px] transition-colors duration-200",
                    snapshot.isDraggingOver && "bg-gray-100"
                  )}
                >
                  {getApplicationsByStatus(status).map((app, index) => (
                    <Draggable key={app.id} draggableId={app.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={cn(
                            "transform transition-transform duration-200",
                            snapshot.isDragging && "rotate-2 scale-105"
                          )}
                        >
                          <Card className="mb-3 p-4 hover:shadow-md transition-shadow duration-200">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <Building2 className="h-4 w-4 text-gray-500" />
                                  <h4 className="font-medium truncate">{app.companyName}</h4>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <Briefcase className="h-4 w-4 text-gray-500" />
                                  <p className="text-sm text-gray-600 truncate">{app.roleName}</p>
                                </div>
                              </div>
                              {app.priority && (
                                <Flag className="h-5 w-5 text-red-500 flex-shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>{format(new Date(app.applicationDate), 'MMM d, yyyy')}</span>
                            </div>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
