import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import BatikPattern from './BatikPattern';

interface TraditionalHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export default function TraditionalHeader({
  title,
  subtitle,
  children,
  variant = 'primary'
}: TraditionalHeaderProps) {

  const variantStyles = {
    primary: 'from-amber-600 via-orange-600 to-red-600',
    secondary: 'from-emerald-600 via-teal-600 to-cyan-600',
    tertiary: 'from-purple-600 via-pink-600 to-rose-600',
  };

  return (
    <div className={`relative bg-gradient-to-r ${variantStyles[variant]} py-16 overflow-hidden`}>
      {/* Batik Pattern Overlay */}
      <div className="absolute inset-0 text-white">
        <BatikPattern />
      </div>

      {/* Ornamental Border Top */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60"></div>

      {/* Decorative Corners */}
      <svg className="absolute top-0 left-0 w-24 h-24 text-yellow-300 opacity-30" viewBox="0 0 100 100">
        <path d="M 0 0 L 30 0 Q 0 0 0 30 Z" fill="currentColor"/>
        <circle cx="15" cy="15" r="3" fill="currentColor"/>
      </svg>
      <svg className="absolute top-0 right-0 w-24 h-24 text-yellow-300 opacity-30 transform scale-x-[-1]" viewBox="0 0 100 100">
        <path d="M 0 0 L 30 0 Q 0 0 0 30 Z" fill="currentColor"/>
        <circle cx="15" cy="15" r="3" fill="currentColor"/>
      </svg>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          {/* Traditional Ornament Above Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-4"
          >
            <svg className="w-16 h-8 text-yellow-300" viewBox="0 0 100 50">
              <path d="M 10 25 Q 25 10 50 25 Q 75 10 90 25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="50" cy="25" r="4" fill="currentColor"/>
              <circle cx="25" cy="20" r="2" fill="currentColor"/>
              <circle cx="75" cy="20" r="2" fill="currentColor"/>
            </svg>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              fontFamily: 'Georgia, serif'
            }}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-amber-50 mb-6 font-light"
            >
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {children}
            </motion.div>
          )}

          {/* Traditional Ornament Below Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mt-6"
          >
            <svg className="w-32 h-4 text-yellow-300" viewBox="0 0 200 30">
              <path d="M 10 15 L 40 15 M 160 15 L 190 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="100" cy="15" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="100" cy="15" r="4" fill="currentColor"/>
              <path d="M 50 15 Q 75 5 100 15 Q 125 5 150 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Ornamental Border Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60"></div>

      {/* Wave Pattern Bottom */}
      <svg className="absolute bottom-0 left-0 right-0 text-amber-50" viewBox="0 0 1200 60" preserveAspectRatio="none">
        <path d="M 0 30 Q 300 0 600 30 Q 900 60 1200 30 L 1200 60 L 0 60 Z" fill="currentColor" opacity="0.1"/>
      </svg>
    </div>
  );
}
