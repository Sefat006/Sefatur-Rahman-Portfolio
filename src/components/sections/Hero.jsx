import React, { useRef, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Sparkles } from 'lucide-react';
import HeroSocialButtons from '../ui/HeroSocialButtons';

const Hero = () => {
  const canvasRef = useRef(null);

  // Interactive Constellation Background Canvas with IntersectionObserver pause
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = true;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

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

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseout', handleMouseLeave, { passive: true });

    // Generate constellation nodes (scaled down on mobile for high FPS)
    const isMobile = window.innerWidth < 768;
    const baseNodeCount = Math.floor((width * height) / 14000) || 60;
    const nodeCount = isMobile ? Math.min(baseNodeCount, 25) : Math.min(Math.max(baseNodeCount, 45), 85);

    const nodes = Array.from({ length: nodeCount }, () => ({
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
      if (!isVisible) return;
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
        ctx.fill();

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
          const mouseAlpha = (1 - mdist / mouseMaxDist) * 0.35;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${mouseAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    }, { threshold: 0.05 });

    if (canvas) observer.observe(canvas);
    render();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Pure White Shooting Stars (Upper edge & Upper-Left, aiming towards bottom corner)
  const shootingStars = [
    { id: 1, top: '2%', left: '10%', angle: '40deg', delay: '2.5s', duration: '9.5s' },
    { id: 2, top: '-2%', left: '36%', angle: '48deg', delay: '6.5s', duration: '12s' },
    { id: 3, top: '1%', left: '4%', angle: '36deg', delay: '11s', duration: '10.5s' },
    { id: 4, top: '-3%', left: '56%', angle: '52deg', delay: '15.5s', duration: '13s' },
    { id: 5, top: '-1%', left: '22%', angle: '44deg', delay: '20s', duration: '11.5s' }
  ];

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
        className="absolute inset-0 w-full h-full pointer-events-none z-0 transform-gpu"
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Subtle deep space vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,#000000_90%)] pointer-events-none" />

      {/* Pure White Shooting Stars (Pure CSS Animations) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {shootingStars.map((m) => (
          <div
            key={m.id}
            style={{
              position: 'absolute',
              top: m.top,
              left: m.left,
              transform: `rotate(${m.angle || '40deg'})`,
              transformOrigin: 'top left'
            }}
          >
            <div
              style={{
                animation: `shooting-star ${m.duration} ease-in infinite ${m.delay}`,
                animationFillMode: 'both',
              }}
              className="flex items-center opacity-0 transform-gpu"
            >
              {/* Meteor Tail: perfectly trailing behind the head */}
              <div className="w-28 sm:w-36 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-white" />
              {/* Glowing Meteor Head: leads at the front */}
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_16px_rgba(255,255,255,0.95)] -ml-0.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Subtle Top Border Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ===== Hero Content with Pure CSS Entrance ===== */}
      <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto z-10 pt-2 pb-14 transition-all duration-300 transform-gpu">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111]/95 md:bg-white/5 border border-white/10 md:backdrop-blur-md text-xs font-medium text-gray-300 mb-3.5 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available for Opportunities</span>
          <Sparkles size={12} className="text-primary ml-1" />
        </div>

        {/* Heading */}
        <h1 className="flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-1.5 mb-2 font-bold tracking-tight leading-tight">
          <div className="flex items-center text-2xl md:text-3xl lg:text-4xl text-gray-100">
            <span>Hey, I am</span>
          </div>
          <span className="text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary pb-1 drop-shadow-sm">
            Sefat
          </span>
          <div className="flex items-center text-3xl md:text-4xl lg:text-5xl text-gray-100">
            <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
          </div>
        </h1>
        
        {/* Animated Subtitle */}
        <div className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-400 mb-4 h-12 flex items-center justify-center mt-0.5">
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
        </div>
        
        {/* Bio Paragraph */}
        <p className="text-gray-400 text-center text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 leading-relaxed px-2">
          I deliver complete, responsive web solutions based on client requirements, focusing on clean layouts, search optimization and modern web standards.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-white to-gray-200 text-black font-semibold hover:from-gray-100 hover:to-gray-300 transition-all shadow-lg shadow-white/10 cursor-pointer text-sm sm:text-base hover:scale-105 active:scale-95 transform-gpu"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-xl border border-white/15 bg-[#111]/95 md:bg-white/5 md:hover:bg-white/10 text-gray-200 transition-all md:backdrop-blur-sm cursor-pointer text-sm sm:text-base hover:scale-105 active:scale-95 transform-gpu"
          >
            Contact Me
          </a>
        </div>

        {/* 3D Animated Social Profile Buttons (GitHub, LinkedIn, Codeforces, LeetCode) */}
        <div className="flex items-center justify-center">
          <HeroSocialButtons />
        </div>
      </div>

      {/* ===== Interactive Animated Scroll Down Dock ===== */}
      <button
        type="button"
        onClick={handleScrollDown}
        className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer group focus:outline-none hover:scale-105 active:scale-95 transform-gpu"
        aria-label="Scroll down to explore"
      >
        {/* Animated Mouse Body with pure CSS downward rolling wheel */}
        <div className="w-5 h-8 rounded-full border-2 border-white/20 group-hover:border-primary/70 flex items-start justify-center p-1 transition-all duration-300 md:backdrop-blur-md bg-[#050505]/95 md:bg-black/40 shadow-lg">
          <div
            style={{ animation: 'mouse-wheel 1.5s ease-in-out infinite' }}
            className="w-1 h-2 rounded-full bg-primary"
          />
        </div>

        {/* Text and bouncing arrow */}
        <div className="flex items-center gap-1 text-[11px] font-mono tracking-widest uppercase text-gray-400 group-hover:text-primary transition-colors">
          <span>Scroll Down</span>
          <ArrowDown size={12} className="animate-bounce text-primary" />
        </div>
      </button>
    </section>
  );
};

export default Hero;
