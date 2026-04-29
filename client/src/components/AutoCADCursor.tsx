import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const AutoCADCursor: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the cursor movement
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const isInteractive = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('input') || 
        target.closest('select') || 
        target.closest('textarea') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsMouseDown(false);
    };
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Main Cursor Container */}
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          scale: isMouseDown ? 0.8 : 1,
        }}
        className="absolute w-32 h-32 flex items-center justify-center"
      >
        {/* Central Square (Pickbox) */}
        <motion.div
          className="absolute border-2"
          style={{ width: 12, height: 12 }}
          animate={{
            borderColor: isHovering ? 'hsl(var(--accent))' : 'white',
            backgroundColor: isHovering ? 'hsl(var(--accent) / 0.1)' : 'transparent',
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Radiating Lines (+) */}
        {/* Top */}
        <motion.div
          className="absolute w-[1.5px]"
          style={{ bottom: 'calc(50% + 6px)', height: 40 }}
          animate={{ 
            backgroundColor: isHovering ? 'hsl(var(--accent))' : 'white',
          }}
          transition={{ duration: 0.2 }}
        />
        {/* Bottom */}
        <motion.div
          className="absolute w-[1.5px]"
          style={{ top: 'calc(50% + 6px)', height: 40 }}
          animate={{ 
            backgroundColor: isHovering ? 'hsl(var(--accent))' : 'white',
          }}
          transition={{ duration: 0.2 }}
        />
        {/* Left */}
        <motion.div
          className="absolute h-[1.5px]"
          style={{ right: 'calc(50% + 6px)', width: 40 }}
          animate={{ 
            backgroundColor: isHovering ? 'hsl(var(--accent))' : 'white',
          }}
          transition={{ duration: 0.2 }}
        />
        {/* Right */}
        <motion.div
          className="absolute h-[1.5px]"
          style={{ left: 'calc(50% + 6px)', width: 40 }}
          animate={{ 
            backgroundColor: isHovering ? 'hsl(var(--accent))' : 'white',
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </div>
  );
};

export default AutoCADCursor;
