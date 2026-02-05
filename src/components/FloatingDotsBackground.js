import React, { useEffect, useRef } from 'react';

const FloatingDotsBackground = ({ opacity = 0.3, primaryColor = '#8b5cf6', secondaryColor = '#40e0d0' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let dots = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createDots = () => {
      dots = [];
      const dotCount = Math.floor((canvas.width * canvas.height) / 8000);
      
      for (let i = 0; i < dotCount; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * opacity + 0.1,
          color: Math.random() > 0.5 ? primaryColor : secondaryColor,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawDot = (dot) => {
      const pulseFactor = Math.sin(Date.now() * dot.pulseSpeed + dot.pulsePhase) * 0.3 + 0.7;
      const currentSize = dot.size * pulseFactor;
      const currentOpacity = dot.opacity * pulseFactor;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, currentSize, 0, Math.PI * 2);
      ctx.fillStyle = `${dot.color}${Math.floor(currentOpacity * 255).toString(16).padStart(2, '0')}`;
      ctx.fill();

      // Add glow effect
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, currentSize * 2, 0, Math.PI * 2);
      ctx.fillStyle = `${dot.color}${Math.floor(currentOpacity * 0.2 * 255).toString(16).padStart(2, '0')}`;
      ctx.fill();
    };

    const updateDot = (dot) => {
      dot.x += dot.vx;
      dot.y += dot.vy;

      // Bounce off edges
      if (dot.x < 0 || dot.x > canvas.width) {
        dot.vx *= -1;
        dot.x = Math.max(0, Math.min(canvas.width, dot.x));
      }
      if (dot.y < 0 || dot.y > canvas.height) {
        dot.vy *= -1;
        dot.y = Math.max(0, Math.min(canvas.height, dot.y));
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const connectionOpacity = (1 - distance / 150) * 0.1;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `${primaryColor}${Math.floor(connectionOpacity * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach(dot => {
        updateDot(dot);
        drawDot(dot);
      });

      drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
      createDots();
    };

    // Initialize
    resizeCanvas();
    createDots();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [opacity, primaryColor, secondaryColor]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default FloatingDotsBackground;