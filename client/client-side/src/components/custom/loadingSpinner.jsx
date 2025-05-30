import React from 'react';
import { motion } from 'framer-motion'; // For animations

const LoadingSpinner = () => {
  // Animation variants for the spinning circle
  const circleVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1.2,
        ease: 'linear',
      },
    },
  };

  // Animation variants for the pulsing effect
  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center h-screen w-screen bg-gray-100/50 dark:bg-gray-900/50 z-50">
      <motion.div
        className="relative flex items-center justify-center"
        variants={pulseVariants}
        animate="animate"
      >
        {/* Background Glow */}
        <div className="absolute w-12 h-12 bg-black/30 dark:bg-gray-300/20 rounded-full blur-md"></div>

        {/* Spinner SVG */}
        <motion.svg
          className="h-10 w-10 text-black dark:text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          variants={circleVariants}
          animate="animate"
        >
          {/* Gradient Circle for Background */}
          <defs>
            <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#000000', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#4B5563', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <circle
            className="opacity-20"
            cx="12"
            cy="12"
            r="10"
            stroke="url(#spinnerGradient)"
            strokeWidth="4"
          ></circle>

          {/* Gradient Path for Spinning Arc */}
          <defs>
            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#000000', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#4B5563', stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
          <path
            className="opacity-90"
            fill="url(#arcGradient)"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;