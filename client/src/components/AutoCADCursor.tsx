import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const AutoCADCursor: React.FC = () => {
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isSelectionActive, setIsSelectionActive] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const selectionStartX = useMotionValue(-100);
  const selectionStartY = useMotionValue(-100);

  // Check touch devices
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const touchMedia = window.matchMedia('(pointer: coarse)');
      setIsTouch(touchMedia.matches);
      const listener = (e: MediaQueryListEvent) => setIsTouch(e.matches);
      touchMedia.addEventListener('change', listener);
      return () => touchMedia.removeEventListener('change', listener);
    }
  }, []);

  // Hide default cursor only when desktop and cursor is actively visible
  useEffect(() => {
    if (isTouch || !isVisible) return;

    const style = document.createElement('style');
    style.id = 'autocad-cursor-style';
    style.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      const existing = document.getElementById('autocad-cursor-style');
      if (existing) document.head.removeChild(existing);
    };
  }, [isTouch, isVisible]);

  useEffect(() => {
    if (isTouch) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (target && target instanceof Element) {
        const isInteractive =
          target.closest('a, button, input, select, textarea, [role="button"], .interactive') !== null ||
          window.getComputedStyle(target).cursor === 'pointer';
        setIsHovering(isInteractive);
      }

      if (isMouseDown) {
        const dx = Math.abs(e.clientX - selectionStartX.get());
        const dy = Math.abs(e.clientY - selectionStartY.get());
        if (dx > 4 || dy > 4) {
          setIsSelectionActive(true);
        }
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || e.button !== 0) return;
      setIsMouseDown(true);
      selectionStartX.set(e.clientX);
      selectionStartY.set(e.clientY);
    };

    const handlePointerUp = () => {
      setIsMouseDown(false);
      setIsSelectionActive(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsMouseDown(false);
      setIsSelectionActive(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTouch, isVisible, isMouseDown]);

  // Selection box transforms
  const selectionWidth = useTransform([mouseX, selectionStartX], ([x, sx]: number[]) => Math.abs(x - sx));
  const selectionHeight = useTransform([mouseY, selectionStartY], ([y, sy]: number[]) => Math.abs(y - sy));
  const selectionLeft = useTransform([mouseX, selectionStartX], ([x, sx]: number[]) => (x < sx ? x : sx));
  const selectionTop = useTransform([mouseY, selectionStartY], ([y, sy]: number[]) => (y < sy ? y : sy));

  // AutoCAD Green (Crossing / Drag Left) vs Blue (Window / Drag Right) selection box colors
  const selectionBg = useTransform([mouseX, selectionStartX], ([x, sx]: number[]) =>
    x < sx ? 'rgba(34, 197, 94, 0.18)' : 'rgba(59, 130, 246, 0.18)'
  );
  const selectionBorder = useTransform([mouseX, selectionStartX], ([x, sx]: number[]) =>
    x < sx ? '1.5px dashed rgba(34, 197, 94, 0.9)' : '1.5px solid rgba(59, 130, 246, 0.9)'
  );

  const cursorBaseColor = 'hsl(var(--color-cursor, 0 0% 100%))';

  if (isTouch || !isVisible) return null;

  return (
    <div id="autocad-cursor-root" className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden select-none">
      {/* AutoCAD Visual Selection Box */}
      {isSelectionActive && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            x: selectionLeft,
            y: selectionTop,
            width: selectionWidth,
            height: selectionHeight,
            backgroundColor: selectionBg,
            border: selectionBorder,
            pointerEvents: 'none',
            zIndex: 999998,
          }}
        />
      )}

      {/* AutoCAD Crosshair Cursor */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isMouseDown ? 0.85 : 1,
        }}
        className="pointer-events-none"
      >
        <div className="relative w-32 h-32 flex items-center justify-center pointer-events-none">
          {/* Central Pick Box */}
          <motion.div
            className="absolute border-2 transition-colors duration-150 pointer-events-none"
            style={{
              width: 12,
              height: 12,
              borderColor: isHovering ? 'hsl(var(--accent))' : cursorBaseColor,
              backgroundColor: isHovering ? 'hsl(var(--accent) / 0.15)' : 'transparent',
            }}
          />

          {/* Top Line */}
          <motion.div
            className="absolute w-[1.5px] transition-colors duration-150 pointer-events-none"
            style={{
              bottom: 'calc(50% + 6px)',
              height: 40,
              backgroundColor: isHovering ? 'hsl(var(--accent))' : cursorBaseColor,
            }}
          />
          {/* Bottom Line */}
          <motion.div
            className="absolute w-[1.5px] transition-colors duration-150 pointer-events-none"
            style={{
              top: 'calc(50% + 6px)',
              height: 40,
              backgroundColor: isHovering ? 'hsl(var(--accent))' : cursorBaseColor,
            }}
          />
          {/* Left Line */}
          <motion.div
            className="absolute h-[1.5px] transition-colors duration-150 pointer-events-none"
            style={{
              right: 'calc(50% + 6px)',
              width: 40,
              backgroundColor: isHovering ? 'hsl(var(--accent))' : cursorBaseColor,
            }}
          />
          {/* Right Line */}
          <motion.div
            className="absolute h-[1.5px] transition-colors duration-150 pointer-events-none"
            style={{
              left: 'calc(50% + 6px)',
              width: 40,
              backgroundColor: isHovering ? 'hsl(var(--accent))' : cursorBaseColor,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default AutoCADCursor;
