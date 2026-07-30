import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const AutoCADCursor: React.FC = () => {
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isSelectionActive, setIsSelectionActive] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const selectionStartX = useMotionValue(0);
  const selectionStartY = useMotionValue(0);

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
    style.innerHTML = `
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
      setIsVisible(true);

      const target = e.target;
      if (target && target instanceof Element) {
        const isInteractive =
          target.closest('a, button, input, select, textarea, [role="button"], .interactive') !== null ||
          window.getComputedStyle(target).cursor === 'pointer';
        setIsHovering(isInteractive);
      }

      // AutoCAD Selection window calculation
      if (isMouseDown && (Math.abs(e.clientX - selectionStartX.get()) > 5 || Math.abs(e.clientY - selectionStartY.get()) > 5)) {
        setIsSelectionActive(true);
        const sx = selectionStartX.get();
        const sy = selectionStartY.get();
        const curX = e.clientX;
        const curY = e.clientY;

        const isCrossing = curX < sx; // Drag left: Green Crossing box | Drag right: Blue Window box
        const selLeft = Math.min(curX, sx);
        const selTop = Math.min(curY, sy);
        const selRight = Math.max(curX, sx);
        const selBottom = Math.max(curY, sy);

        const elements = document.querySelectorAll('section, nav, header, footer, div:not(#autocad-cursor-root *), .card, .badge, button, a, h1, h2, h3, p');
        elements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) return;

          let isInside = false;
          if (isCrossing) {
            isInside = !(rect.right < selLeft || rect.left > selRight || rect.bottom < selTop || rect.top > selBottom);
          } else {
            isInside = rect.left >= selLeft && rect.right <= selRight && rect.top >= selTop && rect.bottom <= selBottom;
          }

          if (isInside) {
            el.classList.add('cad-selected');
          } else {
            el.classList.remove('cad-selected');
          }
        });
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
      document.querySelectorAll('.cad-selected').forEach((el) => el.classList.remove('cad-selected'));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsMouseDown(false);
      setIsSelectionActive(false);
      document.querySelectorAll('.cad-selected').forEach((el) => el.classList.remove('cad-selected'));
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

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
  }, [isTouch, isMouseDown]);

  // Selection box transforms
  const selectionWidth = useTransform([mouseX, selectionStartX], ([x, sx]: number[]) => Math.abs(x - sx));
  const selectionHeight = useTransform([mouseY, selectionStartY], ([y, sy]: number[]) => Math.abs(y - sy));
  const selectionLeft = useTransform([mouseX, selectionStartX], ([x, sx]: number[]) => (x < sx ? x : sx));
  const selectionTop = useTransform([mouseY, selectionStartY], ([y, sy]: number[]) => (y < sy ? y : sy));

  // AutoCAD Green (Crossing) vs Blue (Window) selection box colors
  const selectionBg = useTransform([mouseX, selectionStartX], ([x, sx]: number[]) =>
    x < sx ? 'rgba(0, 255, 128, 0.15)' : 'rgba(0, 120, 215, 0.15)'
  );
  const selectionBorder = useTransform([mouseX, selectionStartX], ([x, sx]: number[]) =>
    x < sx ? '1px dashed rgba(0, 255, 128, 0.8)' : '1px solid rgba(0, 120, 215, 0.8)'
  );

  const cursorBaseColor = 'hsl(var(--color-cursor, 0 0% 100%))';

  if (isTouch || !isVisible) return null;

  return (
    <div id="autocad-cursor-root" className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden">
      {/* Selection Box */}
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
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Central Pick Box */}
          <motion.div
            className="absolute border-2 transition-colors duration-150"
            style={{
              width: 12,
              height: 12,
              borderColor: isHovering ? 'hsl(var(--accent))' : cursorBaseColor,
              backgroundColor: isHovering ? 'hsl(var(--accent) / 0.15)' : 'transparent',
            }}
          />

          {/* Top Line */}
          <motion.div
            className="absolute w-[1.5px] transition-colors duration-150"
            style={{
              bottom: 'calc(50% + 6px)',
              height: 40,
              backgroundColor: isHovering ? 'hsl(var(--accent))' : cursorBaseColor,
            }}
          />
          {/* Bottom Line */}
          <motion.div
            className="absolute w-[1.5px] transition-colors duration-150"
            style={{
              top: 'calc(50% + 6px)',
              height: 40,
              backgroundColor: isHovering ? 'hsl(var(--accent))' : cursorBaseColor,
            }}
          />
          {/* Left Line */}
          <motion.div
            className="absolute h-[1.5px] transition-colors duration-150"
            style={{
              right: 'calc(50% + 6px)',
              width: 40,
              backgroundColor: isHovering ? 'hsl(var(--accent))' : cursorBaseColor,
            }}
          />
          {/* Right Line */}
          <motion.div
            className="absolute h-[1.5px] transition-colors duration-150"
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
