// Keyboard / mouse (pointer lock) / gamepad input.

export class Input {
  keys = new Set<string>();
  pressed = new Set<string>();
  mouseDX = 0;
  mouseDY = 0;
  locked = false;
  enabled = true;
  private canvas: HTMLElement;
  onLockChange?: (locked: boolean) => void;

  constructor(canvas: HTMLElement) {
    this.canvas = canvas;
    window.addEventListener('keydown', (e) => {
      if (!this.enabled) return;
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      if (!this.keys.has(e.code)) this.pressed.add(e.code);
      this.keys.add(e.code);
      if (['Space', 'Tab', 'ArrowUp', 'ArrowDown'].includes(e.code) && this.locked) e.preventDefault();
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    window.addEventListener('blur', () => this.keys.clear());
    window.addEventListener('mousemove', (e) => {
      if (!this.locked) return;
      this.mouseDX += e.movementX;
      this.mouseDY += e.movementY;
    });
    window.addEventListener('mousedown', (e) => {
      if (this.locked) this.pressed.add('Mouse' + e.button);
    });
    document.addEventListener('pointerlockchange', () => {
      this.locked = document.pointerLockElement === this.canvas;
      if (!this.locked) this.keys.clear();
      this.onLockChange?.(this.locked);
    });
  }

  lock() {
    const c = this.canvas as HTMLElement & { requestPointerLock: (o?: unknown) => Promise<void> | void };
    try {
      const r = c.requestPointerLock({ unadjustedMovement: true });
      if (r && typeof (r as Promise<void>).catch === 'function') (r as Promise<void>).catch(() => c.requestPointerLock());
    } catch {
      c.requestPointerLock();
    }
  }
  unlock() {
    if (document.pointerLockElement) document.exitPointerLock();
  }

  down(code: string) {
    return this.enabled && this.keys.has(code);
  }
  hit(code: string) {
    return this.enabled && this.pressed.has(code);
  }

  /** Gamepad axes merged into a movement vector + look delta. */
  pad(): { mx: number; mz: number; lx: number; ly: number; sprint: boolean; crouch: boolean; flash: boolean; use: boolean } | null {
    const gp = navigator.getGamepads?.().find((g) => g && g.connected);
    if (!gp) return null;
    const dz = (v: number) => (Math.abs(v) < 0.15 ? 0 : v);
    return {
      mx: dz(gp.axes[0]),
      mz: dz(gp.axes[1]),
      lx: dz(gp.axes[2] ?? 0),
      ly: dz(gp.axes[3] ?? 0),
      sprint: !!gp.buttons[10]?.pressed || !!gp.buttons[4]?.pressed,
      crouch: !!gp.buttons[1]?.pressed,
      flash: !!gp.buttons[3]?.pressed,
      use: !!gp.buttons[0]?.pressed,
    };
  }

  endFrame() {
    this.pressed.clear();
    this.mouseDX = 0;
    this.mouseDY = 0;
  }
}
