import React from 'react';
import { ApplicationStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown, PartyPopper } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import Confetti from '@/components/animations/Confetti'; // <-- Import the reusable Confetti
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
  showConfetti?: boolean;
}

const statuses: ApplicationStatus[] = [
  'Applied',
  'Interviewing',
  'Offer',
  'Rejected',
  'Ghosted'
];

const StatusSelector: React.FC<StatusSelectorProps> = ({ currentStatus, onChange, showConfetti = false }) => {
  const [localShowConfetti, setLocalShowConfetti] = React.useState(false);

  const handleStatusChange = (status: ApplicationStatus) => {
    if (status === 'Offer' && showConfetti) {
      setLocalShowConfetti(true);
      setTimeout(() => setLocalShowConfetti(false), 4000);
    }
    onChange(status);
  };

  return (
    <>
      <AnimatePresence>
        {localShowConfetti && <Confetti show={localShowConfetti} duration={2000} />}
      </AnimatePresence>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${getStatusColor(currentStatus)}`} />
            <span className={getStatusTextColor(currentStatus)}>{currentStatus}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuRadioGroup value={currentStatus} onValueChange={(value) => handleStatusChange(value as ApplicationStatus)}>
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
    </>
  );
};

export default StatusSelector;