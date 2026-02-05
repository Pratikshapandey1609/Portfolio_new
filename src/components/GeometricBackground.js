import React, { useEffect, useRef } from 'react';

const GeometricBackground = ({ opacity = 0.1, color = '#40e0d0' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let shapes = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createShapes = () => {
      shapes = [];
      const shapeCount = Math.floor((canvas.width * canvas.height) / 20000);
      
      for (let i = 0; i < shapeCount; i++) {
        shapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 60 + 20,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          type: Math.floor(Math.random() * 3), // 0: triangle, 1: square, 2: hexagon
          opacity: Math.random() * opacity + 0.02,
        });
      }
    };

    const drawTriangle = (x, y, size, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(-size / 2, size / 2);
      ctx.lineTo(size / 2, size / 2);
      ctx.closePath();
      ctx.restore();
    };

    const drawSquare = (x, y, size, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.beginPath();
      ctx.rect(-size / 2, -size / 2, size, size);
      ctx.restore();
    };

    const drawHexagon = (x, y, size, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const px = Math.cos(angle) * size / 2;
        const py = Math.sin(angle) * size / 2;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.restore();
    };

    const drawShape = (shape) => {
      ctx.strokeStyle = `${color}${Math.floor(shape.opacity * 255).toString(16).padStart(2, '0')}`;
      ctx.lineWidth = 1;

      switch (shape.type) {
        case 0:
          drawTriangle(shape.x, shape.y, shape.size, shape.rotation);
          break;
        case 1:
          drawSquare(shape.x, shape.y, shape.size, shape.rotation);
          break;
        case 2:
          drawHexagon(shape.x, shape.y, shape.size, shape.rotation);
          break;
        default:
          drawTriangle(shape.x, shape.y, shape.size, shape.rotation);
          break;
      }
      ctx.stroke();
    };

    const updateShape = (shape) => {
      shape.x += shape.vx;
      shape.y += shape.vy;
      shape.rotation += shape.rotationSpeed;

      // Wrap around edges
      if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
      if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
      if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
      if (shape.y > canvas.height + shape.size) shape.y = -shape.size;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach(shape => {
        updateShape(shape);
        drawShape(shape);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
      createShapes();
    };

    // Initialize
    resizeCanvas();
    createShapes();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [opacity, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default GeometricBackground;