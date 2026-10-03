import React from 'react';

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
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary via-purple-500 to-secondary ${currentSize.glow} -z-10 animate-pulse`}
        />

        {/* Radiating pulse ripple ring 1 */}
        <div
          className={`absolute ${currentSize.ringOffset} rounded-2xl border-2 border-primary/50 pointer-events-none animate-ping opacity-75`}
        />

        {/* The main rounded box with pulse animation */}
        <div
          className={`relative ${currentSize.box} bg-[#0b0b12]/90 backdrop-blur-xl border border-primary/40 flex items-center justify-center shadow-2xl overflow-hidden shadow-primary/30`}
        >
          {/* Subtle interior glossy gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          {/* Interior corner accent light */}
          <div className="absolute top-0 right-0 w-10 h-10 bg-primary/20 rounded-full blur-md pointer-events-none" />

          {/* Letter S with pulse animation and gradient */}
          <span
            className={`font-black ${currentSize.text} tracking-tighter bg-gradient-to-br from-white via-primary to-purple-400 bg-clip-text text-transparent select-none drop-shadow-[0_2px_12px_rgba(139,92,246,0.6)] animate-pulse`}
          >
            S
          </span>
        </div>
      </div>

      {/* Optional loading text / indicator */}
      {text && (
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <span className="text-xs uppercase tracking-[0.25em] text-gray-300 font-medium">
            {text}
          </span>

          {showProgress && (
            <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden relative">
              <div
                style={{ animation: 'laser-beam 1.5s linear infinite' }}
                className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] transition-opacity duration-300">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

export default Loader;
