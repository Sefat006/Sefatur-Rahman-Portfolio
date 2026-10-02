import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";
import myPhoto from "../../../assets/me.png";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const container = useRef();
  const canvasRef = useRef(null);

  // Smooth Lower-Light Gravity Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

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
      sectionEl.addEventListener("mousemove", handleMouseMove);
      sectionEl.addEventListener("mouseleave", handleMouseLeave);
    }

    // Soft dim particles (subtle lower-light)
    const particleCount = 45;
    const colors = [
      "rgba(255, 255, 255,",
      "rgba(168, 85, 247,",
      "rgba(96, 165, 250,"
    ];

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: Math.random() * 0.4 + 0.15, // gentle downward drift
      baseRadius: Math.random() * 1.5 + 0.8,
      baseAlpha: Math.random() * 0.2 + 0.12, // low light opacity
      color: colors[Math.floor(Math.random() * colors.length)],
      mass: Math.random() * 1.2 + 0.8
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const gravity = 0.012; // gentle cosmic gravity
      const friction = 0.988; // smooth air drag

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Apply gentle gravity pull
        p.vy += gravity * p.mass;

        // Mouse gravitational attraction (gravitational well)
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

        // Wrap around smoothly when falling past bottom
        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
          p.vx = (Math.random() - 0.5) * 0.3;
          p.vy = Math.random() * 0.3 + 0.1;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw soft low-light particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.baseAlpha})`;
        ctx.fill();

        // Connect very close particles with faint gravity threads
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

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (sectionEl) {
        sectionEl.removeEventListener("mousemove", handleMouseMove);
        sectionEl.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useGSAP(
    () => {
      gsap.from(".about-content", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: container },
  );

  return (
    <section id="about" ref={container} className="py-16 lg:py-20 relative z-10 overflow-hidden bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent">
      {/* Subtle Low-Light Gravity Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* ===== Aurora ArtifyOrb Style Gradient Background ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Orb 1: Emerald / Mint Northern Lights */}
        <motion.div
          animate={{
            x: [0, 40, -25, 0],
            y: [0, -35, 25, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-16 left-1/4 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-emerald-500/30 via-teal-400/20 to-cyan-500/10 blur-[100px] mix-blend-screen"
        />

        {/* Orb 2: Deep Purple / Violet Galaxy */}
        <motion.div
          animate={{
            x: [0, -45, 30, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/4 -left-12 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-primary/30 via-purple-600/25 to-indigo-700/15 blur-[110px] mix-blend-screen"
        />

        {/* Orb 3: Cyan / Electric Blue Ribbon */}
        <motion.div
          animate={{
            x: [0, 35, -40, 0],
            y: [0, -25, 35, 0],
            scale: [1, 1.12, 0.92, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-16 right-1/6 w-[450px] h-[450px] rounded-full bg-gradient-to-tl from-secondary/30 via-cyan-400/20 to-blue-600/15 blur-[105px] mix-blend-screen"
        />

        {/* Orb 4: Rose / Magenta Aurora Wave */}
        <motion.div
          animate={{
            x: [0, -30, 35, 0],
            y: [0, 30, -35, 0],
            scale: [0.95, 1.15, 1, 0.95],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-1/2 right-12 w-[380px] h-[380px] rounded-full bg-gradient-to-r from-pink-500/25 via-fuchsia-600/20 to-purple-500/10 blur-[95px] mix-blend-screen"
        />

        {/* Dynamic Wave Curtain Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_0%,#050505_95%)] pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Side: 3D Pop-out Circle */}
          <div className="flex-1 about-content flex justify-center items-center pt-8 sm:pt-10 lg:pt-0">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-end justify-center">
              {/* 1. Nicher Circle (Jeta shudhu body ke clip korbe) */}
              <div className="absolute inset-0 rounded-full border-2 border-white/20 overflow-hidden">
                {/* Circle Layer Image */}
                <img
                  src={myPhoto}
                  alt="Profile Inside"
                  className="w-full h-full object-cover object-top scale-150 translate-y-4"
                />
              </div>

              {/* 2. Overlapping Pop-out Image (Head 3D effect) */}
              <img
                src={myPhoto}
                alt="Profile Popout"
                className="relative z-10 w-full h-full object-cover object-top scale-150 translate-y-4 pointer-events-none"
                style={{
                  clipPath: "polygon(0 -50%, 100% -50%, 100% 50%, 0 50%)", // Shudhu Matha ebong Upper Body 3D hoye baire ashbe
                  WebkitClipPath: "polygon(0 -50%, 100% -50%, 100% 50%, 0 50%)",
                }}
              />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="about-content text-3xl md:text-5xl text-center lg:text-start font-bold mb-6">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">
                Me
              </span>
            </h2>
            <div className="about-content space-y-6 text-gray-400 text-justify text-lg leading-relaxed">
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
                <div className="px-3 sm:px-6 py-3 sm:py-4 rounded-2xl bg-gradient-to-b from-white/10 via-white/5 to-transparent border border-white/10 shadow-lg backdrop-blur-md hover:border-primary/40 transition-colors flex flex-col items-center justify-center">
                  <h4 className="text-2xl sm:text-3xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-300 to-white">
                    7+
                  </h4>
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-primary/90 font-semibold">
                    Projects Completed
                  </p>
                </div>
                <div className="px-3 sm:px-6 py-3 sm:py-4 rounded-2xl bg-gradient-to-b from-white/10 via-white/5 to-transparent border border-white/10 shadow-lg backdrop-blur-md hover:border-secondary/40 transition-colors flex flex-col items-center justify-center">
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
