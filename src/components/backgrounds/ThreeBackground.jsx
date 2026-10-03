import React, { useEffect, useRef } from 'react';

const ThreeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    
    // Add requested WebGL-like options to 2d context for parity and performance
    const ctx = canvas.getContext('2d', {
      powerPreference: "high-performance",
      antialias: true,
      alpha: true
    });
    
    // Cap DPR to 1.5 globally
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    
    let animationFrameId;
    let particles = [];
    const PARTICLE_COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? Math.floor(50 * 0.35) : 50;
    
    // Track mouse position globally since canvas has pointer-events-none
    let mouse = { x: -1000, y: -1000 };
    
    // Theme colors matching the website's dark/luxury aesthetic
    const colors = ['#8b5cf6', '#3b82f6', '#67e8f9']; 

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const createParticle = (isInitial = false) => {
      return {
        x: Math.random() * window.innerWidth,
        // If initial, scatter them everywhere. Otherwise, spawn at the bottom.
        y: isInitial ? Math.random() * window.innerHeight : window.innerHeight + 10,
        size: Math.random() * 2 + 1,
        // Negative speed = upward movement
        speedY: -(Math.random() * 0.5 + 0.2),
        // Negative vertical acceleration (anti-gravity)
        accelY: -0.005,
        vx: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.3,
      };
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle(true));
      }
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseout', handleMouseLeave, { passive: true });
    
    resizeCanvas();
    initParticles();

    let isAnimating = false;

    const animate = () => {
      if (!isAnimating) return;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        
        // Anti-gravity effect
        p.speedY += p.accelY;
        
        // Update positions
        p.x += p.vx;
        p.y += p.speedY;
        
        // Mouse repulsion logic
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          // Calculate force (closer = stronger push)
          const force = (100 - distance) / 100;
          
          p.x += forceDirectionX * force * 3;
          p.y += forceDirectionY * force * 3;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        
        // Respawn particle at bottom if it floats past the top of the screen or sides
        if (p.y < -20 || p.x < -20 || p.x > window.innerWidth + 20) {
          particles[i] = createParticle(false);
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // IntersectionObserver to pause/resume animation loop
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isAnimating) {
            isAnimating = true;
            animate();
          }
        } else {
          isAnimating = false;
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0 }
    );

    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    return () => {
      isAnimating = false;
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 transform-gpu" style={{ transform: 'translateZ(0)' }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default ThreeBackground;
