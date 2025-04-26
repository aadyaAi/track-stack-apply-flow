
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

const Confetti = () => {
  const colors = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];
  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {Array.from({ length: 100 }).map((_, i) => {
        const angle = (360 / 50) * (i % 50);
        return (
          <motion.div
            key={i}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              rotate: 0,
              opacity: 1
            }}
            animate={{
              x: `${Math.cos(angle * (Math.PI / 180)) * (Math.random() * 400 + 100)}px`,
              y: `${Math.sin(angle * (Math.PI / 180)) * (Math.random() * 400 + 100)}px`,
              scale: Math.random() * 1 + 0.5,
              rotate: Math.random() * 360,
              opacity: 0
            }}
            transition={{
              duration: 2,
              ease: [0.23, 1, 0.32, 1],
              delay: Math.random() * 0.2,
              opacity: { duration: 1.5, delay: 0.5 }
            }}
            className="absolute w-3 h-3 rounded-full"
            style={{
              backgroundColor: colors[Math.floor(Math.random() * colors.length)],
              boxShadow: '0 0 10px rgba(0,0,0,0.1)'
            }}
          />
        );
      })}
      <motion.div
        initial={{ scale: 0, rotate: -180, opacity: 1 }}
        animate={{ scale: 1.5, rotate: 0, opacity: 0 }}
        transition={{ 
          duration: 1,
          opacity: { duration: 0.5, delay: 1 }
        }}
        className="text-6xl"
      >
        🎉
      </motion.div>
    </motion.div>
  );
};

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
