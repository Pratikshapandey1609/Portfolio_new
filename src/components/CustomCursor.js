import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Add event listeners for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], .cursor-pointer, input, textarea, select'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setIsHovering(true);
          setCursorVariant('hover');
        });
        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setCursorVariant('default');
        });
      });

      // Special handling for navigation items
      const navItems = document.querySelectorAll('.nav-item');
      navItems.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setIsHovering(true);
          setCursorVariant('nav');
        });
        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setCursorVariant('default');
        });
      });

      // Special handling for project cards
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setIsHovering(true);
          setCursorVariant('project');
        });
        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setCursorVariant('default');
        });
      });

      // Special handling for skill items
      const skillItems = document.querySelectorAll('.skill-item');
      skillItems.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setIsHovering(true);
          setCursorVariant('skill');
        });
        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setCursorVariant('default');
        });
      });
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Add hover listeners after a short delay to ensure DOM is ready
    setTimeout(addHoverListeners, 100);

    // Re-add listeners when route changes or content updates
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, []);

  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      backgroundColor: 'rgba(64, 224, 208, 0.8)',
      border: '2px solid rgba(64, 224, 208, 1)',
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      backgroundColor: 'rgba(64, 224, 208, 0.2)',
      border: '2px solid rgba(64, 224, 208, 1)',
    },
    nav: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.25,
      backgroundColor: 'rgba(255, 215, 0, 0.3)',
      border: '2px solid rgba(255, 215, 0, 1)',
    },
    project: {
      x: mousePosition.x - 28,
      y: mousePosition.y - 28,
      scale: 1.75,
      backgroundColor: 'rgba(138, 43, 226, 0.2)',
      border: '2px solid rgba(138, 43, 226, 1)',
    },
    skill: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.25,
      backgroundColor: 'rgba(255, 69, 0, 0.3)',
      border: '2px solid rgba(255, 69, 0, 1)',
    },
    clicking: {
      scale: 0.8,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      border: '2px solid rgba(255, 255, 255, 1)',
    },
  };

  const trailVariants = {
    x: mousePosition.x - 4,
    y: mousePosition.y - 4,
  };

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        variants={cursorVariants}
        animate={isClicking ? 'clicking' : cursorVariant}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
        style={{
          backgroundColor: cursorVariants[cursorVariant]?.backgroundColor,
          border: cursorVariants[cursorVariant]?.border,
        }}
      />

      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9998] bg-electric-blue opacity-60"
        variants={trailVariants}
        animate={trailVariants}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          mass: 0.2,
        }}
      />

      {/* Additional trail dots */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none z-[9997] bg-electric-blue"
          animate={{
            x: mousePosition.x - 2,
            y: mousePosition.y - 2,
            opacity: 0.4 - i * 0.1,
          }}
          transition={{
            type: 'spring',
            stiffness: 200 - i * 50,
            damping: 15 + i * 5,
            mass: 0.1 + i * 0.05,
          }}
        />
      ))}

      {/* Hover effect ring */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[9996] border-2 border-electric-blue"
          animate={{
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
            scale: isClicking ? 0.8 : 1,
            opacity: 0.6,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;