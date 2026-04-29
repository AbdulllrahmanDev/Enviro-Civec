import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';

const AutoCADCursor: React.FC = () => {
  const cursorBaseColor = 'hsl(var(--color-cursor))';

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the cursor movement
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  
  // Selection state using motion values for performance
  const selectionStartX = useMotionValue(0);
  const selectionStartY = useMotionValue(0);
  const [isSelectionActive, setIsSelectionActive] = useState(false);

  useEffect(() => {
    // Inject global style to hide system cursor everywhere
    const style = document.createElement('style');
    style.innerHTML = `
      *, *::before, *::after {
        cursor: none !important;
      }
      html, body {
        cursor: none !important;
        user-select: none;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const isInteractive = 
        target.closest('a, button, input, select, textarea, [role="button"]') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(!!isInteractive);

      // Element Selection Logic
      if (isSelectionActive) {
        const sx = selectionStartX.get();
        const sy = selectionStartY.get();
        const cx = e.clientX;
        const cy = e.clientY;
        
        const left = Math.min(sx, cx);
        const right = Math.max(sx, cx);
        const top = Math.min(sy, cy);
        const bottom = Math.max(sy, cy);
        const isCrossing = cx < sx;

        // Query a wide range of elements for selection, excluding the cursor itself
        const elements = document.querySelectorAll('section, nav, header, footer, div:not(#autocad-cursor-root *), card, .badge, .stat, .counter, button, a, h1, h2, h3, p, li, span, svg:not(#autocad-cursor-root *), img, input, label');
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        
        elements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          let isSelected = false;

          // Standard intersection check
          const intersects = !(rect.right < left || rect.left > right || rect.bottom < top || rect.top > bottom);
          
          if (intersects) {
            const isLarge = rect.width > vw * 0.5 || rect.height > vh * 0.5;
            const isContainer = isLarge || ['section', 'nav', 'header', 'footer'].includes(el.tagName.toLowerCase());

            if (isContainer) {
              // Large containers/sections: Only select with GREEN (Crossing) and ONLY if we touch the border
              if (isCrossing) {
                const isFullyInside = (left >= rect.left && right <= rect.right && top >= rect.top && bottom <= rect.bottom);
                isSelected = !isFullyInside;
              } else {
                isSelected = false; // Blue window ignores large containers
              }
            } else {
              // For smaller elements, use standard AutoCAD rules
              if (isCrossing) {
                isSelected = true; // Touches or inside
              } else {
                isSelected = rect.left >= left && rect.right <= right && rect.top >= top && rect.bottom <= bottom;
              }
            }
          }

          if (isSelected) {
            (el as HTMLElement).classList.add('cad-selected');
          } else {
            (el as HTMLElement).classList.remove('cad-selected');
          }
        });
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      setIsMouseDown(true);
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const isInteractive = target.closest('a, button, input, select, textarea, [role="button"]');
      
      if (!isInteractive) {
        selectionStartX.set(e.clientX);
        selectionStartY.set(e.clientY);
        setIsSelectionActive(true);
      }
    };

    const handlePointerUp = () => {
      setIsMouseDown(false);
      setIsSelectionActive(false);
      // Clear selection highlights on release
      document.querySelectorAll('.cad-selected').forEach(el => el.classList.remove('cad-selected'));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsMouseDown(false);
      setIsSelectionActive(false);
      document.querySelectorAll('.cad-selected').forEach(el => el.classList.remove('cad-selected'));
    };
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('pointermove', handlePointerMove, { capture: true });
    window.addEventListener('pointerdown', handlePointerDown, { capture: true });
    window.addEventListener('pointerup', handlePointerUp, { capture: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove, { capture: true });
      window.removeEventListener('pointerdown', handlePointerDown, { capture: true });
      window.removeEventListener('pointerup', handlePointerUp, { capture: true });
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible, isSelectionActive]);

  // Derived selection motion values
  const selectionWidth = useTransform([smoothX, selectionStartX], ([x, sx]: number[]) => Math.abs(x - sx));
  const selectionHeight = useTransform([smoothY, selectionStartY], ([y, sy]: number[]) => Math.abs(y - sy));

  const selectionLeft = useTransform([smoothX, selectionStartX], ([x, sx]: number[]) => x < sx ? x : sx);
  const selectionTop = useTransform([smoothY, selectionStartY], ([y, sy]: number[]) => y < sy ? y : sy);

  const selectionBg = useTransform([smoothX, selectionStartX], ([x, sx]: number[]) => 
    x < sx ? 'rgba(0, 255, 0, 0.2)' : 'rgba(0, 100, 255, 0.2)'
  );
  
  const selectionBorder = useTransform([smoothX, selectionStartX], ([x, sx]: number[]) => 
    `1.5px ${x < sx ? 'dashed' : 'solid'} ${x < sx ? '#00ff00' : '#00bfff'}`
  );

  if (!isVisible) return null;

  return (
    <div id="autocad-cursor-root" className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden">
      {/* AutoCAD Selection Window */}
      {isSelectionActive && (
        <motion.div
          style={{
            position: 'absolute',
            left: selectionLeft,
            top: selectionTop,
            width: selectionWidth,
            height: selectionHeight,
            backgroundColor: selectionBg,
            border: selectionBorder,
            zIndex: -1,
          }}
        />
      )}

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
            borderColor: isHovering ? 'hsl(var(--accent))' : cursorBaseColor,
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
            backgroundColor: isHovering ? 'hsl(var(--accent))' : cursorBaseColor,
          }}
          transition={{ duration: 0.2 }}
        />
        {/* Bottom */}
        <motion.div
          className="absolute w-[1.5px]"
          style={{ top: 'calc(50% + 6px)', height: 40 }}
          animate={{ 
            backgroundColor: isHovering ? 'hsl(var(--accent))' : cursorBaseColor,
          }}
          transition={{ duration: 0.2 }}
        />
        {/* Left */}
        <motion.div
          className="absolute h-[1.5px]"
          style={{ right: 'calc(50% + 6px)', width: 40 }}
          animate={{ 
            backgroundColor: isHovering ? 'hsl(var(--accent))' : cursorBaseColor,
          }}
          transition={{ duration: 0.2 }}
        />
        {/* Right */}
        <motion.div
          className="absolute h-[1.5px]"
          style={{ left: 'calc(50% + 6px)', width: 40 }}
          animate={{ 
            backgroundColor: isHovering ? 'hsl(var(--accent))' : cursorBaseColor,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </div>
  );
};

export default AutoCADCursor;
