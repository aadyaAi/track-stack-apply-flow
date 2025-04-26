import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiProps {
  show: boolean;
  duration?: number; // in ms
  colors?: string[];
  count?: number;
}

const DEFAULT_COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

const Confetti: React.FC<ConfettiProps> = ({
  show,
  duration = 2000,
  colors = DEFAULT_COLORS,
  count = 100,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {Array.from({ length: count }).map((_, i) => {
            const angle = (360 / 50) * (i % 50);
            return (
              <motion.div
                key={i}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  rotate: 0,
                  opacity: 1,
                }}
                animate={{
                  x: `${Math.cos(angle * (Math.PI / 180)) * (Math.random() * 400 + 100)}px`,
                  y: `${Math.sin(angle * (Math.PI / 180)) * (Math.random() * 400 + 100)}px`,
                  scale: Math.random() * 1 + 0.5,
                  rotate: Math.random() * 360,
                  opacity: 0,
                }}
                transition={{
                  duration: duration / 1000,
                  ease: [0.23, 1, 0.32, 1],
                  delay: Math.random() * 0.2,
                  opacity: { duration: duration / 1300, delay: 0.5 },
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                }}
              />
            );
          })}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 1 }}
            animate={{ scale: 1.5, rotate: 0, opacity: 0 }}
            transition={{
              duration: 1,
              opacity: { duration: 0.5, delay: 1 },
            }}
            className="text-6xl"
          >
            🎉
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Confetti;