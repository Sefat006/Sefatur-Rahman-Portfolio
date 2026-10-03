import React, { useRef, useEffect } from "react";
import "./About.css";
import myPhoto from "../../../assets/me.webp";

const About = () => {
  const container = useRef(null);
  const canvasRef = useRef(null);

  // Smooth Lower-Light Gravity Particle Animation with IntersectionObserver pause
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let isVisible = true;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    const mouse = { x: -2000, y: -2000, active: false };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -2000;
      mouse.y = -2000;
    };

    const sectionEl = container.current;
    if (sectionEl) {
      sectionEl.addEventListener("mousemove", handleMouseMove, { passive: true });
      sectionEl.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }

    // Soft dim particles (subtle lower-light)
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 18 : 40;
    const colors = [
      "rgba(255, 255, 255,",
      "rgba(168, 85, 247,",
      "rgba(96, 165, 250,"
    ];

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: Math.random() * 0.4 + 0.15,
      baseRadius: Math.random() * 1.5 + 0.8,
      baseAlpha: Math.random() * 0.2 + 0.12,
      color: colors[Math.floor(Math.random() * colors.length)],
      mass: Math.random() * 1.2 + 0.8
    }));

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      const gravity = 0.012;
      const friction = 0.988;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.vy += gravity * p.mass;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;

          if (dist < maxDist && dist > 15) {
            const force = ((maxDist - dist) / maxDist) * 0.045;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.vx *= friction;
        p.vy *= friction;

        p.x += p.vx;
        p.y += p.vy;

        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
          p.vx = (Math.random() - 0.5) * 0.3;
          p.vy = Math.random() * 0.3 + 0.1;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.baseAlpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < 65) {
            const threadAlpha = (1 - cdist / 65) * 0.06;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${threadAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
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
      window.removeEventListener("resize", handleResize);
      if (sectionEl) {
        sectionEl.removeEventListener("mousemove", handleMouseMove);
        sectionEl.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Pure IntersectionObserver for smooth fade-in entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-4");
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "100px 0px 0px 0px",
        threshold: 0.01,
      }
    );

    if (container.current) {
      const items = container.current.querySelectorAll(".about-fade-item");
      items.forEach((item, index) => {
        item.classList.add("opacity-0", "translate-y-4", "transition-all", "duration-400", "ease-out");
        item.style.transitionDelay = `${index * 80}ms`;
        observer.observe(item);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={container} className="py-16 lg:py-20 relative z-10 overflow-hidden bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent">
      {/* Subtle Low-Light Gravity Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 transform-gpu"
        style={{ transform: 'translateZ(0)' }}
      />

      {/* ===== Pure CSS Aurora Gradient Background (Zero CPU Loop) ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 transform-gpu" style={{ transform: 'translateZ(0)' }}>
        {/* Orb 1: Emerald / Mint Northern Lights */}
        <div
          style={{ animation: 'float-slow 14s ease-in-out infinite alternate' }}
          className="absolute -top-16 left-1/4 w-[380px] h-[380px] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-tr from-emerald-500/25 via-teal-400/15 to-cyan-500/10 blur-[80px] sm:blur-[100px] mix-blend-screen transform-gpu"
        />

        {/* Orb 2: Deep Purple / Violet Galaxy */}
        <div
          style={{ animation: 'float-slow 16s ease-in-out infinite 2s alternate-reverse' }}
          className="absolute top-1/4 -left-12 w-[400px] h-[400px] sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-br from-primary/25 via-purple-600/20 to-indigo-700/15 blur-[85px] sm:blur-[110px] mix-blend-screen transform-gpu"
        />

        {/* Orb 3: Cyan / Electric Blue Ribbon */}
        <div
          style={{ animation: 'float-slow 18s ease-in-out infinite 4s alternate' }}
          className="absolute -bottom-16 right-1/6 w-[380px] h-[380px] sm:w-[450px] sm:h-[450px] rounded-full bg-gradient-to-tl from-secondary/25 via-cyan-400/15 to-blue-600/10 blur-[85px] sm:blur-[105px] mix-blend-screen transform-gpu"
        />

        {/* Orb 4: Rose / Magenta Aurora Wave */}
        <div
          style={{ animation: 'float-slow 15s ease-in-out infinite 1s alternate-reverse' }}
          className="absolute top-1/2 right-12 w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full bg-gradient-to-r from-pink-500/20 via-fuchsia-600/15 to-purple-500/10 blur-[75px] sm:blur-[95px] mix-blend-screen transform-gpu"
        />

        {/* Dynamic Wave Curtain Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_0%,#050505_95%)] pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Side: 3D Pop-out Circle */}
          <div className="about-fade-item flex-1 flex justify-center items-center pt-8 sm:pt-10 lg:pt-0">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-end justify-center">
              {/* 1. Nicher Circle (Jeta shudhu body ke clip korbe) */}
              <div className="absolute inset-0 rounded-full border-2 border-white/20 overflow-hidden shadow-2xl">
                {/* Circle Layer Image */}
                <img
                  src={myPhoto}
                  alt="Profile Inside"
                  className="w-full h-full object-cover object-top scale-150 translate-y-4"
                  loading="lazy"
                />
              </div>

              {/* 2. Overlapping Pop-out Image (Head 3D effect) */}
              <img
                src={myPhoto}
                alt="Profile Popout"
                className="relative z-10 w-full h-full object-cover object-top scale-150 translate-y-4 pointer-events-none"
                style={{
                  clipPath: "polygon(0 -50%, 100% -50%, 100% 50%, 0 50%)",
                  WebkitClipPath: "polygon(0 -50%, 100% -50%, 100% 50%, 0 50%)",
                }}
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="about-fade-item text-3xl md:text-5xl text-center lg:text-start font-bold mb-6">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">
                Me
              </span>
            </h2>
            <div className="about-fade-item space-y-6 text-gray-400 text-justify text-lg leading-relaxed">
              <p>
                Hi! I'm a final-year Computer Science student. I am naturally
                curious and love exploring new technology. My approach is
                simple: I try to learn how things work from the absolute basics.
                Understanding the fundamentals helps me easily visualize,
                troubleshoot and solve coding problems.
              </p>
              <p>
                With a strong foundation in both front-end aesthetics and
                back-end architecture, I specialize in building scalable web
                applications. My journey started with a curiosity for how things
                work, and it evolved into a career of solving complex problems
                with clean code.
              </p>
              {/* Stat Cards with Gradient Glassmorphism (side-by-side on all screens) */}
              <div className="pt-6 grid grid-cols-2 max-w-sm sm:max-w-md mx-auto lg:mx-0 text-center gap-3 sm:gap-6">
                <div className="px-3 sm:px-6 py-3 sm:py-4 rounded-2xl bg-gradient-to-b from-white/10 via-white/5 to-transparent border border-white/10 shadow-lg md:backdrop-blur-md hover:border-primary/40 transition-colors flex flex-col items-center justify-center transform-gpu">
                  <h4 className="text-2xl sm:text-3xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-300 to-white">
                    7+
                  </h4>
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-primary/90 font-semibold">
                    Projects Completed
                  </p>
                </div>
                <div className="px-3 sm:px-6 py-3 sm:py-4 rounded-2xl bg-gradient-to-b from-white/10 via-white/5 to-transparent border border-white/10 shadow-lg md:backdrop-blur-md hover:border-secondary/40 transition-colors flex flex-col items-center justify-center transform-gpu">
                  <h4 className="text-2xl sm:text-3xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-secondary via-cyan-300 to-white">
                    100%
                  </h4>
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-secondary/90 font-semibold">
                    Client Satisfaction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
