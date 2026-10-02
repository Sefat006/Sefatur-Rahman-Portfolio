import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({
  fullScreen = true,
  size = 'md',
  text = 'Loading...',
  showProgress = true,
}) => {
  // Size presets for the rounded box and letter 'S'
  const sizeMap = {
    sm: {
      box: 'w-14 h-14 rounded-xl',
      text: 'text-2xl',
      glow: 'blur-md',
      ringOffset: 'inset-[-6px]',
    },
    md: {
      box: 'w-20 h-20 rounded-2xl',
      text: 'text-4xl',
      glow: 'blur-xl',
      ringOffset: 'inset-[-8px]',
    },
    lg: {
      box: 'w-28 h-28 rounded-3xl',
      text: 'text-5xl',
      glow: 'blur-2xl',
      ringOffset: 'inset-[-12px]',
    },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const loaderContent = (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Container for the pulsing rounded box */}
      <div className="relative flex items-center justify-center">
        {/* Outer ambient pulsing glow aura */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.35, 0.75, 0.35],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary via-purple-500 to-secondary ${currentSize.glow} -z-10`}
        />

        {/* Radiating pulse ripple ring 1 */}
        <motion.div
          animate={{
            scale: [1, 1.35],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          className={`absolute ${currentSize.ringOffset} rounded-2xl border-2 border-primary/50 pointer-events-none`}
        />

        {/* Radiating pulse ripple ring 2 with slight delay */}
        <motion.div
          animate={{
            scale: [1, 1.45],
            opacity: [0.4, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 0.5,
          }}
          className={`absolute ${currentSize.ringOffset} rounded-2xl border border-secondary/40 pointer-events-none`}
        />

        {/* The main rounded box with pulse animation */}
        <motion.div
          animate={{
            scale: [1, 1.06, 1],
            boxShadow: [
              '0 0 20px rgba(139, 92, 246, 0.3)',
              '0 0 40px rgba(139, 92, 246, 0.65)',
              '0 0 20px rgba(139, 92, 246, 0.3)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`relative ${currentSize.box} bg-[#0b0b12]/90 backdrop-blur-xl border border-primary/40 flex items-center justify-center shadow-2xl overflow-hidden`}
        >
          {/* Subtle interior glossy gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          {/* Interior corner accent light */}
          <div className="absolute top-0 right-0 w-10 h-10 bg-primary/20 rounded-full blur-md pointer-events-none" />

          {/* Letter S with pulse animation and gradient */}
          <motion.span
            animate={{
              opacity: [0.85, 1, 0.85],
              scale: [0.98, 1.04, 0.98],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`font-black ${currentSize.text} tracking-tighter bg-gradient-to-br from-white via-primary to-purple-400 bg-clip-text text-transparent select-none drop-shadow-[0_2px_12px_rgba(139,92,246,0.6)]`}
          >
            S
          </motion.span>
        </motion.div>
      </div>

      {/* Optional loading text / indicator */}
      {text && (
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-gray-300 font-medium">
            {text}
          </span>

          {showProgress && (
            <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </div>
          )}
        </motion.div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]"
      >
        {loaderContent}
      </motion.div>
    );
  }

  return loaderContent;
};

export default Loader;
