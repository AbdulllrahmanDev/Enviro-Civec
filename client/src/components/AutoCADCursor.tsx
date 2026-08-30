import React, { useEffect, useRef } from 'react';

const AutoCADCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    const selection = selectionRef.current;
    if (!cursor) return;

    let mouseX = -100;
    let mouseY = -100;
    let startX = 0;
    let startY = 0;
    let isMouseDown = false;
    let isSelecting = false;
    let isHovering = false;
    let isVisible = false;
    let rafId = 0;

    const interactiveSelector =
      'a, button, input, select, textarea, [role="button"], .interactive, [data-interactive="true"], .btn-primary, .btn-secondary, .filter-tab, .icon-btn';

    const updateCursor = () => {
      if (cursor) {
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${isMouseDown ? 0.85 : 1})`;
        cursor.style.opacity = isVisible ? '1' : '0';
        if (isHovering) {
          cursor.classList.add('cursor-hovering');
        } else {
          cursor.classList.remove('cursor-hovering');
        }
      }

      if (selection) {
        if (isSelecting) {
          const x = Math.min(mouseX, startX);
          const y = Math.min(mouseY, startY);
          const w = Math.abs(mouseX - startX);
          const h = Math.abs(mouseY - startY);
          const isLeftDrag = mouseX < startX;

          selection.style.display = 'block';
          selection.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          selection.style.width = `${w}px`;
          selection.style.height = `${h}px`;
          selection.style.backgroundColor = isLeftDrag
            ? 'rgba(34, 197, 94, 0.18)'
            : 'rgba(59, 130, 246, 0.18)';
          selection.style.border = isLeftDrag
            ? '1.5px dashed rgba(34, 197, 94, 0.9)'
            : '1.5px solid rgba(59, 130, 246, 0.9)';
        } else {
          selection.style.display = 'none';
        }
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) isVisible = true;

      const target = e.target as HTMLElement | null;
      const hoveringNow = !!target && !!target.closest(interactiveSelector);

      if (hoveringNow !== isHovering) {
        isHovering = hoveringNow;
      }

      if (isMouseDown) {
        const dx = Math.abs(mouseX - startX);
        const dy = Math.abs(mouseY - startY);
        if (dx > 4 || dy > 4) {
          isSelecting = true;
        }
      }

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          updateCursor();
          rafId = 0;
        });
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || e.button !== 0) return;
      isMouseDown = true;
      startX = e.clientX;
      startY = e.clientY;
      updateCursor();
    };

    const handlePointerUp = () => {
      isMouseDown = false;
      isSelecting = false;
      updateCursor();
    };

    const handleMouseLeave = () => {
      isVisible = false;
      isMouseDown = false;
      isSelecting = false;
      updateCursor();
    };

    const handleMouseEnter = () => {
      isVisible = true;
      updateCursor();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div id="autocad-cursor-root" className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden select-none">
      {/* AutoCAD Visual Selection Box */}
      <div
        ref={selectionRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          display: 'none',
          pointerEvents: 'none',
          zIndex: 999998,
        }}
      />

      {/* AutoCAD Crosshair Cursor */}
      <div
        ref={cursorRef}
        className="autocad-crosshair-wrap"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform',
          transition: 'transform 0.05s ease-out',
        }}
      >
        <div className="relative w-32 h-32 flex items-center justify-center pointer-events-none">
          {/* Central Pick Box */}
          <div
            className="autocad-box absolute border-2 transition-colors duration-150 pointer-events-none"
            style={{
              width: 12,
              height: 12,
            }}
          />

          {/* Top Line */}
          <div
            className="autocad-line absolute w-[1.5px] transition-colors duration-150 pointer-events-none"
            style={{
              bottom: 'calc(50% + 6px)',
              height: 40,
            }}
          />
          {/* Bottom Line */}
          <div
            className="autocad-line absolute w-[1.5px] transition-colors duration-150 pointer-events-none"
            style={{
              top: 'calc(50% + 6px)',
              height: 40,
            }}
          />
          {/* Left Line */}
          <div
            className="autocad-line absolute h-[1.5px] transition-colors duration-150 pointer-events-none"
            style={{
              right: 'calc(50% + 6px)',
              width: 40,
            }}
          />
          {/* Right Line */}
          <div
            className="autocad-line absolute h-[1.5px] transition-colors duration-150 pointer-events-none"
            style={{
              left: 'calc(50% + 6px)',
              width: 40,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AutoCADCursor;
