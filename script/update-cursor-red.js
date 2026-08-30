import fs from 'fs';
import path from 'path';

const targetDir = 'C:\\Users\\ptdng\\Desktop\\Enviro-Civec';

// 1. Update ts/autocad-cursor.ts
const tsCursorContent = `/**
 * AutoCAD Crosshair Cursor & Interactive Selection Box
 * Pure TypeScript implementation for Enviro-Civec
 */

export interface CursorOptions {
  hoverColor?: string;
  crosshairSize?: number;
  pickBoxSize?: number;
}

export class AutoCADCursor {
  private container: HTMLDivElement | null = null;
  private cursorElement: HTMLDivElement | null = null;
  private boxElement: HTMLDivElement | null = null;
  private lines: HTMLDivElement[] = [];
  private selectionElement: HTMLDivElement | null = null;

  private mouseX: number = -100;
  private mouseY: number = -100;
  private startX: number = 0;
  private startY: number = 0;

  private isMouseDown: boolean = false;
  private isSelecting: boolean = false;
  private isHovering: boolean = false;
  private isVisible: boolean = false;
  private isTouch: boolean = false;
  private rafId: number = 0;

  private readonly interactiveSelector: string =
    'a, button, input, select, textarea, [role="button"], .interactive, [data-interactive="true"], .btn-primary, .btn-secondary, .filter-tab, .icon-btn';

  constructor(options: CursorOptions = {}) {
    this.init();
  }

  public init(): void {
    if (typeof window === 'undefined') return;

    this.isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (this.isTouch) return;

    this.createElements();
    this.bindEvents();
  }

  private createElements(): void {
    this.container = document.createElement('div');
    this.container.id = 'autocad-cursor-root';
    this.container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:999999;overflow:hidden;user-select:none;';

    this.selectionElement = document.createElement('div');
    this.selectionElement.style.cssText = 'position:fixed;top:0;left:0;display:none;pointer-events:none;z-index:999998;';
    this.container.appendChild(this.selectionElement);

    this.cursorElement = document.createElement('div');
    this.cursorElement.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;will-change:transform;transition:transform 0.05s ease-out;';

    const inner = document.createElement('div');
    inner.style.cssText = 'position:relative;width:128px;height:128px;display:flex;align-items:center;justify-content:center;pointer-events:none;';

    // Central Pick Box
    this.boxElement = document.createElement('div');
    this.boxElement.style.cssText = 'position:absolute;width:12px;height:12px;border:2px solid var(--color-cursor, #ffffff);background:transparent;transition:border-color 0.15s ease, background-color 0.15s ease;pointer-events:none;';
    inner.appendChild(this.boxElement);

    // 4 Crosshair Lines
    const createLine = (style: string): HTMLDivElement => {
      const line = document.createElement('div');
      line.style.cssText = style + 'position:absolute;background-color:var(--color-cursor, #ffffff);transition:background-color 0.15s ease;pointer-events:none;';
      return line;
    };

    const l1 = createLine('width:1.5px;height:40px;bottom:calc(50% + 6px);');
    const l2 = createLine('width:1.5px;height:40px;top:calc(50% + 6px);');
    const l3 = createLine('height:1.5px;width:40px;right:calc(50% + 6px);');
    const l4 = createLine('height:1.5px;width:40px;left:calc(50% + 6px);');

    this.lines = [l1, l2, l3, l4];
    this.lines.forEach(l => inner.appendChild(l));

    this.cursorElement.appendChild(inner);
    this.container.appendChild(this.cursorElement);
    document.body.appendChild(this.container);
  }

  private bindEvents(): void {
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    window.addEventListener('pointerdown', this.onPointerDown, { passive: true });
    window.addEventListener('pointerup', this.onPointerUp, { passive: true });
    document.addEventListener('mouseleave', this.onMouseLeave);
    document.addEventListener('mouseenter', this.onMouseEnter);
  }

  private onPointerMove = (e: PointerEvent): void => {
    if (e.pointerType === 'touch') return;
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    if (!this.isVisible) this.isVisible = true;

    const target = e.target as HTMLElement | null;
    const hovering = !!target && !!target.closest(this.interactiveSelector);

    if (hovering !== this.isHovering) {
      this.isHovering = hovering;
      this.updateColors();
    }

    if (this.isMouseDown) {
      const dx = Math.abs(this.mouseX - this.startX);
      const dy = Math.abs(this.mouseY - this.startY);
      if (dx > 4 || dy > 4) {
        this.isSelecting = true;
      }
    }

    if (!this.rafId) {
      this.rafId = requestAnimationFrame(() => {
        this.render();
        this.rafId = 0;
      });
    }
  };

  private updateColors(): void {
    const redColor = 'var(--accent, #b82417)';
    const defaultColor = 'var(--color-cursor, #ffffff)';

    if (this.boxElement) {
      this.boxElement.style.borderColor = this.isHovering ? redColor : defaultColor;
      this.boxElement.style.backgroundColor = this.isHovering ? 'rgba(184, 36, 23, 0.22)' : 'transparent';
    }

    this.lines.forEach(line => {
      line.style.backgroundColor = this.isHovering ? redColor : defaultColor;
    });
  }

  private onPointerDown = (e: PointerEvent): void => {
    if (e.pointerType === 'touch' || e.button !== 0) return;
    this.isMouseDown = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.render();
  };

  private onPointerUp = (): void => {
    this.isMouseDown = false;
    this.isSelecting = false;
    this.render();
  };

  private onMouseLeave = (): void => {
    this.isVisible = false;
    this.isMouseDown = false;
    this.isSelecting = false;
    this.render();
  };

  private onMouseEnter = (): void => {
    this.isVisible = true;
    this.render();
  };

  private render(): void {
    if (this.cursorElement) {
      this.cursorElement.style.transform = \`translate3d(\${this.mouseX}px, \${this.mouseY}px, 0) translate(-50%, -50%) scale(\${this.isMouseDown ? 0.85 : 1})\`;
      this.cursorElement.style.opacity = this.isVisible ? '1' : '0';
    }

    if (this.selectionElement) {
      if (this.isSelecting) {
        const x = Math.min(this.mouseX, this.startX);
        const y = Math.min(this.mouseY, this.startY);
        const w = Math.abs(this.mouseX - this.startX);
        const h = Math.abs(this.mouseY - this.startY);
        const isLeftDrag = this.mouseX < this.startX;

        this.selectionElement.style.display = 'block';
        this.selectionElement.style.transform = \`translate3d(\${x}px, \${y}px, 0)\`;
        this.selectionElement.style.width = \`\${w}px\`;
        this.selectionElement.style.height = \`\${h}px\`;
        this.selectionElement.style.backgroundColor = isLeftDrag
          ? 'rgba(34, 197, 94, 0.18)'
          : 'rgba(59, 130, 246, 0.18)';
        this.selectionElement.style.border = isLeftDrag
          ? '1.5px dashed rgba(34, 197, 94, 0.9)'
          : '1.5px solid rgba(59, 130, 246, 0.9)';
      } else {
        this.selectionElement.style.display = 'none';
      }
    }
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    new AutoCADCursor();
  });
}
`;

fs.writeFileSync(path.join(targetDir, 'ts', 'autocad-cursor.ts'), tsCursorContent, 'utf8');

// 2. Update js/autocad-cursor.js
const jsCursorContent = `/**
 * AutoCAD Crosshair Cursor & Selection Box (Compiled from ts/autocad-cursor.ts)
 */
export class AutoCADCursor {
  constructor(options = {}) {
    this.container = null;
    this.cursorElement = null;
    this.boxElement = null;
    this.lines = [];
    this.selectionElement = null;
    this.mouseX = -100;
    this.mouseY = -100;
    this.startX = 0;
    this.startY = 0;
    this.isMouseDown = false;
    this.isSelecting = false;
    this.isHovering = false;
    this.isVisible = false;
    this.isTouch = false;
    this.rafId = 0;
    this.interactiveSelector = 'a, button, input, select, textarea, [role="button"], .interactive, [data-interactive="true"], .btn-primary, .btn-secondary, .filter-tab, .icon-btn';
    this.init();
  }

  init() {
    if (typeof window === 'undefined') return;
    this.isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (this.isTouch) return;
    this.createElements();
    this.bindEvents();
  }

  createElements() {
    this.container = document.createElement('div');
    this.container.id = 'autocad-cursor-root';
    this.container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:999999;overflow:hidden;user-select:none;';

    this.selectionElement = document.createElement('div');
    this.selectionElement.style.cssText = 'position:fixed;top:0;left:0;display:none;pointer-events:none;z-index:999998;';
    this.container.appendChild(this.selectionElement);

    this.cursorElement = document.createElement('div');
    this.cursorElement.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;will-change:transform;transition:transform 0.05s ease-out;';

    const inner = document.createElement('div');
    inner.style.cssText = 'position:relative;width:128px;height:128px;display:flex;align-items:center;justify-content:center;pointer-events:none;';

    this.boxElement = document.createElement('div');
    this.boxElement.style.cssText = 'position:absolute;width:12px;height:12px;border:2px solid var(--color-cursor, #ffffff);background:transparent;transition:border-color 0.15s ease, background-color 0.15s ease;pointer-events:none;';
    inner.appendChild(this.boxElement);

    const createLine = (style) => {
      const line = document.createElement('div');
      line.style.cssText = style + 'position:absolute;background-color:var(--color-cursor, #ffffff);transition:background-color 0.15s ease;pointer-events:none;';
      return line;
    };

    const l1 = createLine('width:1.5px;height:40px;bottom:calc(50% + 6px);');
    const l2 = createLine('width:1.5px;height:40px;top:calc(50% + 6px);');
    const l3 = createLine('height:1.5px;width:40px;right:calc(50% + 6px);');
    const l4 = createLine('height:1.5px;width:40px;left:calc(50% + 6px);');

    this.lines = [l1, l2, l3, l4];
    this.lines.forEach(l => inner.appendChild(l));

    this.cursorElement.appendChild(inner);
    this.container.appendChild(this.cursorElement);
    document.body.appendChild(this.container);
  }

  bindEvents() {
    window.addEventListener('pointermove', this.onPointerMove.bind(this), { passive: true });
    window.addEventListener('pointerdown', this.onPointerDown.bind(this), { passive: true });
    window.addEventListener('pointerup', this.onPointerUp.bind(this), { passive: true });
    document.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    document.addEventListener('mouseenter', this.onMouseEnter.bind(this));
  }

  onPointerMove(e) {
    if (e.pointerType === 'touch') return;
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    if (!this.isVisible) this.isVisible = true;

    const target = e.target;
    const hovering = !!target && !!target.closest(this.interactiveSelector);

    if (hovering !== this.isHovering) {
      this.isHovering = hovering;
      this.updateColors();
    }

    if (this.isMouseDown) {
      const dx = Math.abs(this.mouseX - this.startX);
      const dy = Math.abs(this.mouseY - this.startY);
      if (dx > 4 || dy > 4) {
        this.isSelecting = true;
      }
    }

    if (!this.rafId) {
      this.rafId = requestAnimationFrame(() => {
        this.render();
        this.rafId = 0;
      });
    }
  }

  updateColors() {
    const redColor = 'var(--accent, #b82417)';
    const defaultColor = 'var(--color-cursor, #ffffff)';

    if (this.boxElement) {
      this.boxElement.style.borderColor = this.isHovering ? redColor : defaultColor;
      this.boxElement.style.backgroundColor = this.isHovering ? 'rgba(184, 36, 23, 0.22)' : 'transparent';
    }

    this.lines.forEach(line => {
      line.style.backgroundColor = this.isHovering ? redColor : defaultColor;
    });
  }

  onPointerDown(e) {
    if (e.pointerType === 'touch' || e.button !== 0) return;
    this.isMouseDown = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.render();
  }

  onPointerUp() {
    this.isMouseDown = false;
    this.isSelecting = false;
    this.render();
  }

  onMouseLeave() {
    this.isVisible = false;
    this.isMouseDown = false;
    this.isSelecting = false;
    this.render();
  }

  onMouseEnter() {
    this.isVisible = true;
    this.render();
  }

  render() {
    if (this.cursorElement) {
      this.cursorElement.style.transform = \`translate3d(\${this.mouseX}px, \${this.mouseY}px, 0) translate(-50%, -50%) scale(\${this.isMouseDown ? 0.85 : 1})\`;
      this.cursorElement.style.opacity = this.isVisible ? '1' : '0';
    }

    if (this.selectionElement) {
      if (this.isSelecting) {
        const x = Math.min(this.mouseX, this.startX);
        const y = Math.min(this.mouseY, this.startY);
        const w = Math.abs(this.mouseX - this.startX);
        const h = Math.abs(this.mouseY - this.startY);
        const isLeftDrag = this.mouseX < this.startX;

        this.selectionElement.style.display = 'block';
        this.selectionElement.style.transform = \`translate3d(\${x}px, \${y}px, 0)\`;
        this.selectionElement.style.width = \`\${w}px\`;
        this.selectionElement.style.height = \`\${h}px\`;
        this.selectionElement.style.backgroundColor = isLeftDrag
          ? 'rgba(34, 197, 94, 0.18)'
          : 'rgba(59, 130, 246, 0.18)';
        this.selectionElement.style.border = isLeftDrag
          ? '1.5px dashed rgba(34, 197, 94, 0.9)'
          : '1.5px solid rgba(59, 130, 246, 0.9)';
      } else {
        this.selectionElement.style.display = 'none';
      }
    }
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    new AutoCADCursor();
  });
}
`;

fs.writeFileSync(path.join(targetDir, 'js', 'autocad-cursor.js'), jsCursorContent, 'utf8');

console.log('AutoCAD Cursor updated with brand red hover color across TS and JS!');
