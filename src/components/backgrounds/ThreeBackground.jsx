import React, { useEffect, useRef } from 'react';

const ThreeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    const PARTICLE_COUNT = 50;
    
    // Track mouse position globally since canvas has pointer-events-none
    let mouse = { x: -1000, y: -1000 };
    
    // Theme colors matching the website's dark/luxury aesthetic
    const colors = ['#8b5cf6', '#3b82f6', '#67e8f9']; 

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    
    resizeCanvas();
    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
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
        
        // Respawn particle at bottom if it floats past the top of the screen
        if (p.y < -20 || p.x < -20 || p.x > canvas.width + 20) {
          particles[i] = createParticle(false);
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
    />
  );
};

export default ThreeBackground;
