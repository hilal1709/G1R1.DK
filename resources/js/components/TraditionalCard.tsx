import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TraditionalCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function TraditionalCard({ children, className = '', hoverEffect = true }: TraditionalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hoverEffect ? { y: -5, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' } : {}}
      className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
    >
      {/* Ornamental Corner Decorations */}
      <svg className="absolute top-0 left-0 w-12 h-12 text-amber-500 opacity-20" viewBox="0 0 50 50">
        <path d="M 0 0 L 20 0 Q 0 0 0 20 Z" fill="currentColor"/>
        <circle cx="10" cy="10" r="2" fill="currentColor"/>
      </svg>
      <svg className="absolute top-0 right-0 w-12 h-12 text-amber-500 opacity-20 transform scale-x-[-1]" viewBox="0 0 50 50">
        <path d="M 0 0 L 20 0 Q 0 0 0 20 Z" fill="currentColor"/>
        <circle cx="10" cy="10" r="2" fill="currentColor"/>
      </svg>

      {/* Top Border with Traditional Pattern */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400"></div>

      {/* Content */}
      <div className="relative">
        {children}
      </div>

      {/* Bottom Decorative Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-30">
        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
      </div>
    </motion.div>
  );
}
