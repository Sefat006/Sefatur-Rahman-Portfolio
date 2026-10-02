import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Sparkles } from 'lucide-react';
import HeroSocialButtons from '../ui/HeroSocialButtons';

const Hero = () => {
  const canvasRef = useRef(null);
  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0.2]);
  const contentScale = useTransform(scrollY, [0, 400], [1, 0.94]);
  const contentY = useTransform(scrollY, [0, 400], [0, 60]);

  // Interactive Constellation Background Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    // Generate constellation nodes
    const nodeCount = Math.floor((width * height) / 14000) || 60;
    const nodes = Array.from({ length: Math.min(Math.max(nodeCount, 45), 90) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.5 + 1,
      alpha: Math.random() * 0.5 + 0.4
    }));

    const maxDist = 115;
    const mouseMaxDist = 140;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update positions
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Draw star node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${n.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#ffffff';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.16;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect to mouse cursor
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < mouseMaxDist) {
          const mAlpha = (1 - mdist / mouseMaxDist) * 0.35;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${mAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Shooting stars starting from random upper areas
  const shootingStars = [
    { id: 1, top: '5%', left: '15%', delay: 0.5, duration: 1.8, repeatDelay: 5 },
    { id: 2, top: '16%', left: '52%', delay: 2.2, duration: 1.6, repeatDelay: 6 },
    { id: 3, top: '3%', left: '72%', delay: 4.1, duration: 1.9, repeatDelay: 5.5 },
    { id: 4, top: '22%', left: '8%', delay: 1.2, duration: 1.7, repeatDelay: 6.5 },
    { id: 5, top: '10%', left: '38%', delay: 3.3, duration: 1.8, repeatDelay: 5.8 }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full h-full min-h-[calc(100vh-73px)] flex flex-col items-center justify-center px-6 overflow-hidden text-center bg-black">
      {/* ===== Constellation Canvas Background ===== */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Subtle deep space vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,#000000_90%)] pointer-events-none" />

      {/* Pure White Shooting Stars (Upper corner to bottom) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {shootingStars.map((m) => (
          <div
            key={m.id}
            style={{
              position: 'absolute',
              top: m.top,
              left: m.left,
              transform: 'rotate(38deg)',
              transformOrigin: 'top left'
            }}
          >
            <motion.div
              initial={{ x: 0, opacity: 0 }}
              animate={{
                x: [0, 550],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: m.duration,
                repeat: Infinity,
                repeatDelay: m.repeatDelay,
                delay: m.delay,
                ease: 'easeIn'
              }}
              className="flex items-center"
            >
              {/* Meteor Tail: perfectly trailing behind the head */}
              <div className="w-28 sm:w-36 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-white" />
              {/* Glowing Meteor Head: leads at the front */}
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_16px_rgba(255,255,255,0.95)] -ml-0.5" />
            </motion.div>
          </div>
        ))}
      </div>

      {/* Subtle Top Border Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ===== Hero Content with Scroll Parallax ===== */}
      <motion.div
        style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto z-10 pt-2 pb-14"
      >
        {/* Availability Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-medium text-gray-300 mb-3.5 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available for Opportunities</span>
          <Sparkles size={12} className="text-primary ml-1" />
        </motion.div>

        {/* Heading */}
        <motion.h1 variants={itemVariants} className="flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-1.5 mb-2 font-bold tracking-tight leading-tight">
          <div className="flex items-center text-2xl md:text-3xl lg:text-4xl text-gray-100">
            <span>Hey, I am</span>
          </div>
          <span className="text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary pb-1 drop-shadow-sm">
            Sefat
          </span>
          <div className="flex items-center text-3xl md:text-4xl lg:text-5xl text-gray-100">
            <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
          </div>
        </motion.h1>
        
        {/* Animated Subtitle */}
        <motion.div variants={itemVariants} className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-400 mb-4 h-12 flex items-center justify-center mt-0.5">
          <TypeAnimation
            sequence={[
              'I am a Full Stack Web Developer',
              2000,
              'I am an Software Engineer',
              2000,
              'I am a Continuous Learner Evolving with Tech',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-gray-300 font-mono tracking-tight"
          />
        </motion.div>
        
        {/* Bio Paragraph */}
        <motion.p variants={itemVariants} className="text-gray-400 text-center text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 leading-relaxed px-2">
          I deliver complete, responsive web solutions based on client requirements, focusing on clean layouts, search optimization and modern web standards.
        </motion.p>
        
        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#projects"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-white to-gray-200 text-black font-semibold hover:from-gray-100 hover:to-gray-300 transition-all shadow-lg shadow-white/10 cursor-pointer text-sm sm:text-base"
          >
            View Projects
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="px-8 py-3.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-gray-200 transition-all backdrop-blur-sm cursor-pointer text-sm sm:text-base"
          >
            Contact Me
          </motion.a>
        </motion.div>

        {/* 3D Animated Social Profile Buttons (GitHub, LinkedIn, Codeforces, LeetCode) */}
        <motion.div variants={itemVariants} className="flex items-center justify-center">
          <HeroSocialButtons />
        </motion.div>
      </motion.div>

      {/* ===== Interactive Animated Scroll Down Dock ===== */}
      <motion.button
        type="button"
        onClick={handleScrollDown}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer group focus:outline-none"
        aria-label="Scroll down to explore"
      >
        {/* Animated Mouse Body with downward rolling wheel */}
        <div className="w-5 h-8 rounded-full border-2 border-white/20 group-hover:border-primary/70 flex items-start justify-center p-1 transition-all duration-300 backdrop-blur-md bg-black/40 shadow-lg">
          <motion.div
            animate={{
              y: [0, 8, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
            className="w-1 h-2 rounded-full bg-primary"
          />
        </div>

        {/* Text and bouncing arrow */}
        <div className="flex items-center gap-1 text-[11px] font-mono tracking-widest uppercase text-gray-400 group-hover:text-primary transition-colors">
          <span>Scroll Down</span>
          <ArrowDown size={12} className="animate-bounce text-primary" />
        </div>
      </motion.button>
    </section>
  );
};

export default Hero;
