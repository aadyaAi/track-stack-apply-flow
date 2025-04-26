import React, { useState } from 'react';
import { useApplications } from '@/context/ApplicationContext';
import ApplicationCard from '@/components/applications/ApplicationCard';
import KanbanBoard from '@/components/applications/KanbanBoard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, LayoutGrid, Columns, Download } from 'lucide-react';
import { exportToCSV } from '@/utils/export-utils';
import { ApplicationStatus } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Applications: React.FC = () => {
  const { applications } = useApplications();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<ApplicationStatus[]>([]);
  const [viewType, setViewType] = useState<'grid' | 'kanban'>('kanban');
  
  const filteredApplications = applications.filter(app => {
    const matchesSearch = searchTerm === '' || 
      app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(app.status);
    
    return matchesSearch && matchesStatus;
  });
  
  const allStatuses: ApplicationStatus[] = ['Applied', 'Interviewing', 'Offer', 'Rejected', 'Ghosted'];
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Applications</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => exportToCSV(applications)}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter Status
              {selectedStatuses.length > 0 && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                  {selectedStatuses.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {allStatuses.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={selectedStatuses.includes(status)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedStatuses([...selectedStatuses, status]);
                  } else {
                    setSelectedStatuses(selectedStatuses.filter(s => s !== status));
                  }
                }}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex gap-2">
          <Button
            variant={viewType === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewType('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewType === 'kanban' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewType('kanban')}
          >
            <Columns className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {viewType === 'kanban' ? (
        <KanbanBoard applications={filteredApplications} />
      ) : filteredApplications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredApplications.map(application => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No applications found.</p>
          {applications.length > 0 && (
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Applications;