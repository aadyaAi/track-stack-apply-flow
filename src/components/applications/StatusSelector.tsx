
import React from 'react';
import { ApplicationStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getStatusColor, getStatusTextColor } from '@/utils/status-utils';

interface StatusSelectorProps {
  currentStatus: ApplicationStatus;
  onChange: (status: ApplicationStatus) => void;
}

const statuses: ApplicationStatus[] = [
  'Applied',
  'Interviewing',
  'Offer',
  'Rejected',
  'Ghosted'
];

const StatusSelector: React.FC<StatusSelectorProps> = ({ currentStatus, onChange }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${getStatusColor(currentStatus)}`} />
          <span className={getStatusTextColor(currentStatus)}>{currentStatus}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={currentStatus} onValueChange={(value) => onChange(value as ApplicationStatus)}>
          {statuses.map((status) => (
            <DropdownMenuRadioItem
              key={status}
              value={status}
              className="flex items-center gap-2"
            >
              <span className={`h-2 w-2 rounded-full ${getStatusColor(status)}`} />
              <span>{status}</span>
              {currentStatus === status && <Check className="h-4 w-4 ml-auto" />}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusSelector;
