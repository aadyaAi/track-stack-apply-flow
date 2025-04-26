
import React from 'react';
import { ApplicationStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown, Party } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

const Confetti = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 pointer-events-none z-50"
    style={{
      background: 'radial-gradient(circle, transparent 20%, black 20%, black 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, black 20%, black 80%, transparent 80%, transparent) 50px 50px, linear-gradient(#A7D129 8px, transparent 8px) 0 -4px, linear-gradient(90deg, #A7D129 8px, transparent 8px) -4px 0'
    }}
  >
    {Array.from({ length: 50 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        initial={{
          top: "50%",
          left: "50%",
          scale: 0,
          opacity: 1
        }}
        animate={{
          top: Math.random() * 100 + "%",
          left: Math.random() * 100 + "%",
          scale: 1,
          opacity: 0
        }}
        transition={{
          duration: 1.5,
          delay: Math.random() * 0.2,
          repeat: 2
        }}
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"][Math.floor(Math.random() * 5)]
        }}
      />
    ))}
  </motion.div>
);

const StatusSelector: React.FC<StatusSelectorProps> = ({ currentStatus, onChange }) => {
  const [showConfetti, setShowConfetti] = React.useState(false);

  const handleStatusChange = (status: ApplicationStatus) => {
    if (status === 'Offer') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
    onChange(status);
  };

  return (
    <>
      <AnimatePresence>
        {showConfetti && <Confetti />}
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
