
import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useApplications } from '@/context/ApplicationContext';
import { Card } from '@/components/ui/card';
import { Flag } from 'lucide-react';
import { ApplicationStatus, JobApplication } from '@/types';

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

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto p-4">
        {statuses.map(status => (
          <div key={status} className="flex-shrink-0 w-80">
            <h3 className="font-semibold mb-4">{status}</h3>
            <Droppable droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-50 rounded-lg p-2 min-h-[500px]"
                >
                  {getApplicationsByStatus(status).map((app, index) => (
                    <Draggable key={app.id} draggableId={app.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card className="mb-2 p-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{app.companyName}</h4>
                                <p className="text-sm text-gray-500">{app.roleName}</p>
                              </div>
                              {app.priority && (
                                <Flag className="h-4 w-4 text-red-500" />
                              )}
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
