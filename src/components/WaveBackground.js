import React, { useEffect, useRef } from 'react';

const WaveBackground = ({ opacity = 0.1, color = '#40e0d0' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawWave = (amplitude, frequency, phase, yOffset, strokeOpacity) => {
      ctx.beginPath();
      ctx.strokeStyle = `${color}${Math.floor(strokeOpacity * 255).toString(16).padStart(2, '0')}`;
      ctx.lineWidth = 2;

      for (let x = 0; x <= canvas.width; x += 2) {
        const y = yOffset + amplitude * Math.sin((x * frequency) + phase);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;

      // Draw multiple waves with different properties
      const waves = [
        { amplitude: 30, frequency: 0.01, yOffset: canvas.height * 0.2, opacity: opacity * 0.8 },
        { amplitude: 40, frequency: 0.008, yOffset: canvas.height * 0.4, opacity: opacity * 0.6 },
        { amplitude: 25, frequency: 0.012, yOffset: canvas.height * 0.6, opacity: opacity * 0.7 },
        { amplitude: 35, frequency: 0.009, yOffset: canvas.height * 0.8, opacity: opacity * 0.5 },
      ];

      waves.forEach((wave, index) => {
        const phase = time + (index * Math.PI / 2);
        drawWave(wave.amplitude, wave.frequency, phase, wave.yOffset, wave.opacity);
      });

      // Draw flowing particles along waves
      for (let i = 0; i < 20; i++) {
        const x = (time * 50 + i * 100) % (canvas.width + 100);
        const waveIndex = i % waves.length;
        const wave = waves[waveIndex];
        const y = wave.yOffset + wave.amplitude * Math.sin((x * wave.frequency) + time + (waveIndex * Math.PI / 2));
        
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${Math.floor(wave.opacity * 0.8 * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
    };

    // Initialize
    resizeCanvas();
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

export default WaveBackground;