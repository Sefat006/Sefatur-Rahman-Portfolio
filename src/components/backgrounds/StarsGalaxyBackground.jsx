import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Stars Galaxy (Starfield) Component with Aurora Gradient Glows
 * Adapted from: https://framer.com/m/Stars-Galaxy-mcPCjY.js@Mj2pxzqB0usafl3jU9iO
 */
const StarsGalaxyBackground = ({
  stars = 750,
  speed = 1.8,
  spread = 5,
  focal = 1.8,
  twinkle = 0.35,
  size = 1.6,
  fadeInRange = 4.5,
  reverseFly = true,
  followCursor = true,
  starColor = "#8b5cf6" // Website's primary color
}) => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const starsRef = useRef([]);
  const [isVisible, setIsVisible] = useState(false);

  // Activate starting from #projects downwards across all lower sections
  useEffect(() => {
    const handleScroll = () => {
      const projectsEl = document.getElementById('projects');
      if (!projectsEl) {
        setIsVisible(true);
        return;
      }
      const rect = projectsEl.getBoundingClientRect();
      // Activate as soon as Projects enters viewport
      if (rect.top <= window.innerHeight * 0.75) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    const createStar = () => {
      const rand = Math.random();
      let starBaseSize = 2.8;
      // Multiple larger sizes:
      // 25% prominent large glowing dots (8px - 14px)
      // 35% medium-large dots (4.5px - 7.5px)
      // 40% standard dots (2.6px - 4.2px)
      if (rand > 0.75) {
        starBaseSize = Math.random() * 6 + 8; // 8px to 14px (Noticeably large)
      } else if (rand > 0.4) {
        starBaseSize = Math.random() * 3 + 4.5; // 4.5px to 7.5px (Medium-large)
      } else {
        starBaseSize = Math.random() * 1.6 + 2.6; // 2.6px to 4.2px (Standard)
      }

      return {
        x: (Math.random() - 0.5) * spread,
        y: (Math.random() - 0.5) * spread,
        z: Math.random(),
        tw: Math.random() * Math.PI * 2,
        colorOffset: Math.random(),
        baseSize: starBaseSize,
      };
    };

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * DPR;
      canvas.height = rect.height * DPR;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);
    starsRef.current = Array.from({ length: stars }, createStar);

    const onMouseMove = (e) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      mouse.current.y = clamp((e.clientY - rect.top) / rect.height, 0, 1);
    };
    window.addEventListener('mousemove', onMouseMove);

    let raf = 0;
    const animate = () => {
      const w = canvas.width / DPR;
      const h = canvas.height / DPR;

      // Clear canvas cleanly so the aurora gradient layer shines through
      ctx.clearRect(0, 0, w, h);

      ctx.globalAlpha = 1;

      // Focal origin (follows cursor smoothly or center)
      const cx = followCursor ? mouse.current.x * w : w / 2;
      const cy = followCursor ? mouse.current.y * h : h / 2;

      for (const s of starsRef.current) {
        const depth = s.z * clamp(focal, 0.01, 10) + 0.001;
        const px = cx + (s.x / depth) * w;
        const py = cy + (s.y / depth) * h;

        s.z += reverseFly
          ? clamp(speed, 0, 10) * 0.002
          : -clamp(speed, 0, 10) * 0.002;

        if (s.z <= 0 || s.z > 1) {
          Object.assign(s, createStar());
        }

        s.tw += clamp(twinkle, 0, 1) * 0.05;
        const alpha = Math.max(0, 1 - s.z / clamp(fadeInRange, 0.1, 10));
        
        // Dynamic multi-size radius with perspective forward growth
        const baseRadius = (s.baseSize || 3.0) * (1 - s.z);
        const radius = Math.max(
          1.5,
          baseRadius * (1 + Math.sin(s.tw) * clamp(twinkle, 0, 1) * 0.3)
        );

        // Amplified radiant neon glow for all dots
        if (s.baseSize > 7.5 && s.z < 0.7) {
          ctx.shadowBlur = 24;
          ctx.shadowColor = '#c084fc'; // Intense luminous purple neon halo
        } else if (s.baseSize > 4.2 && s.z < 0.55) {
          ctx.shadowBlur = 14;
          ctx.shadowColor = '#8b5cf6'; // Rich primary purple glow
        } else {
          ctx.shadowBlur = 7;
          ctx.shadowColor = 'rgba(139, 92, 246, 0.65)';
        }

        // All stars and dots use website's primary purple color (#8b5cf6) with depth tones
        if (s.colorOffset > 0.65) {
          ctx.fillStyle = '#c4b5fd'; // Bright glowing primary
        } else if (s.colorOffset > 0.3) {
          ctx.fillStyle = '#8b5cf6'; // Core primary (#8b5cf6)
        } else if (s.colorOffset > 0.1) {
          ctx.fillStyle = '#a78bfa'; // Soft radiant primary
        } else {
          ctx.fillStyle = '#7c3aed'; // Deep rich primary
        }

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [
    stars,
    speed,
    spread,
    focal,
    twinkle,
    size,
    fadeInRange,
    reverseFly,
    followCursor,
    starColor
  ]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 ease-in-out overflow-hidden bg-[#050505]"
      style={{
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
      }}
    >
      {/* Aurora Ambient Gradient Layer Matching Experience Globe Colors (Cyan, Purple, Pink) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Aurora Orb 1: Globe Primary Purple & Violet Wave */}
        <motion.div
          animate={{
            x: [0, 50, -35, 0],
            y: [0, -40, 35, 0],
            scale: [1, 1.2, 0.95, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 left-1/4 w-[540px] h-[540px] rounded-full bg-gradient-to-tr from-[#8b5cf6]/26 via-[#a855f7]/20 to-[#6366f1]/12 blur-[115px] mix-blend-screen"
        />

        {/* Aurora Orb 2: Globe Electric Cyan Wave */}
        <motion.div
          animate={{
            x: [0, -45, 35, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.92, 1.16, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 -right-16 w-[560px] h-[560px] rounded-full bg-gradient-to-bl from-[#38bdf8]/24 via-[#06b6d4]/18 to-[#0284c7]/10 blur-[120px] mix-blend-screen"
        />

        {/* Aurora Orb 3: Globe Cosmic Pink & Magenta Wave */}
        <motion.div
          animate={{
            x: [0, 35, -45, 0],
            y: [0, -35, 40, 0],
            scale: [0.95, 1.18, 0.95, 0.95],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-[#ec4899]/22 via-[#d946ef]/16 to-[#a855f7]/10 blur-[115px] mix-blend-screen"
        />

        {/* Aurora Orb 4: Globe Cyan-Purple-Pink Flow */}
        <motion.div
          animate={{
            x: [0, -35, 30, 0],
            y: [0, 30, -35, 0],
            scale: [1, 1.14, 0.92, 1],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-2/3 -left-16 w-[520px] h-[520px] rounded-full bg-gradient-to-r from-[#06b6d4]/20 via-[#8b5cf6]/18 to-[#ec4899]/14 blur-[120px] mix-blend-screen"
        />

        {/* Smooth Vignette Frame (Balanced light, not too dark and not washed out) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_50%,transparent_20%,#050505_95%)] pointer-events-none" />
      </div>

      {/* 3D Starfield / Stars Galaxy Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          background: 'transparent',
        }}
      />
    </div>
  );
};

export default StarsGalaxyBackground;
