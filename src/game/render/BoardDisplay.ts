// The notes pinned to the cork board in the base, drawn into a canvas texture that sits on the
// board's face. Redrawn whenever the shared board changes. Slots are fixed, so a note keeps its
// place while it is up; anything past BOARD_SLOTS lives in the overflow pile (see the panel).

import * as THREE from 'three';
import { board, BOARD_SLOTS, type Note } from '../net/Board';
import { patchEntityMaterial } from './materials';

const W = 2048;
const H = Math.round((W * 0.9) / 1.5); // cork face is 1.5 m x 0.9 m
const COLS = 4;
const ROWS = Math.ceil(BOARD_SLOTS / COLS);
const PAPER = ['#eee6cf', '#e9dfb8', '#f1ecd9', '#e2e8cf', '#ead7c4', '#dfe3e8'];
const PINS = ['#b23b2c', '#2f5fa8', '#3b8a4a', '#c9a227', '#7d3fa1'];
const HAND = '"Caveat", "Segoe Print", "Bradley Hand", cursive';

/** deterministic per-note jitter, so a note doesn't hop around each redraw */
function rnd(id: string, k: number) {
  let h = 2166136261 ^ k;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 16777619);
  return ((h >>> 0) % 10000) / 10000;
}

function wrap(ctx: CanvasRenderingContext2D, text: string, width: number): string[] {
  const out: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    const tryLine = line ? line + ' ' + word : word;
    if (ctx.measureText(tryLine).width <= width || !line) {
      // hard-break words longer than the line
      if (ctx.measureText(tryLine).width > width && !line) {
        let w = '';
        for (const ch of word) {
          if (ctx.measureText(w + ch).width > width) {
            out.push(w);
            w = '';
          }
          w += ch;
        }
        line = w;
      } else line = tryLine;
    } else {
      out.push(line);
      line = word;
    }
  }
  if (line) out.push(line);
  return out;
}

export class BoardDisplay {
  readonly mesh: THREE.Mesh;
  private canvas = document.createElement('canvas');
  private ctx: CanvasRenderingContext2D;
  private tex: THREE.CanvasTexture;
  private listener = () => this.draw();
  private fontReady = false;

  constructor(anisotropy = 8) {
    this.canvas.width = W;
    this.canvas.height = H;
    this.ctx = this.canvas.getContext('2d')!;
    this.tex = new THREE.CanvasTexture(this.canvas);
    this.tex.colorSpace = THREE.SRGBColorSpace;
    this.tex.anisotropy = anisotropy;
    const mat = patchEntityMaterial(
      new THREE.MeshStandardMaterial({ map: this.tex, transparent: true, alphaTest: 0.02, roughness: 0.92, metalness: 0, polygonOffset: true, polygonOffsetFactor: -2 }),
    );
    // the cork face is 1.5 x 0.9 m, 2.2 cm proud of the wall, facing +Z in model space
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.9), mat);
    this.mesh.position.z = 0.024;
    this.mesh.receiveShadow = true;
    this.mesh.name = 'BoardNotes';
    board.listeners.add(this.listener);
    this.draw();
    void document.fonts?.load(`600 40px ${HAND}`).then(() => {
      this.fontReady = true;
      this.draw();
    });
  }

  private draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, W, H);
    const { pinned, overflow } = board.split();
    const cw = W / COLS;
    const ch = H / ROWS;
    pinned.forEach((n, i) => this.note(n, (i % COLS) * cw, Math.floor(i / COLS) * ch, cw, ch));
    if (!pinned.length) this.card('Notices', 'Nothing pinned yet. Leave a warning for whoever comes next.', W / 2, H / 2);
    if (overflow.length) this.tag(`+${overflow.length} more in the pile`, W - 230, H - 34);
    this.tex.needsUpdate = true;
  }

  private note(n: Note, x: number, y: number, cw: number, ch: number) {
    const ctx = this.ctx;
    const pw = cw * (0.8 + rnd(n.id, 1) * 0.08);
    const ph = ch * (0.78 + rnd(n.id, 2) * 0.1);
    const cx = x + cw / 2 + (rnd(n.id, 3) - 0.5) * (cw - pw) * 0.8;
    const cy = y + ch / 2 + (rnd(n.id, 4) - 0.5) * (ch - ph) * 0.8;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((rnd(n.id, 5) - 0.5) * 0.09);
    // paper with a soft drop shadow and a slightly curled corner
    ctx.shadowColor = 'rgba(0,0,0,0.45)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 7;
    ctx.fillStyle = n.expires === Infinity ? '#e8d48a' : PAPER[Math.floor(rnd(n.id, 6) * PAPER.length)];
    ctx.beginPath();
    ctx.moveTo(-pw / 2, -ph / 2);
    ctx.lineTo(pw / 2, -ph / 2);
    ctx.lineTo(pw / 2, ph / 2 - 26);
    ctx.lineTo(pw / 2 - 30, ph / 2);
    ctx.lineTo(-pw / 2, ph / 2);
    ctx.closePath();
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.beginPath();
    ctx.moveTo(pw / 2, ph / 2 - 26);
    ctx.lineTo(pw / 2 - 30, ph / 2);
    ctx.lineTo(pw / 2 - 26, ph / 2 - 22);
    ctx.fill();
    if (n.expires === Infinity) {
      ctx.strokeStyle = '#a8862a';
      ctx.lineWidth = 5;
      ctx.strokeRect(-pw / 2 + 8, -ph / 2 + 8, pw - 16, ph - 16);
    }
    // handwriting, shrunk until it fits
    const pad = 26;
    let size = 46;
    let lines: string[] = [];
    for (; size >= 24; size -= 2) {
      ctx.font = `600 ${size}px ${HAND}`;
      lines = wrap(ctx, n.text, pw - pad * 2);
      if (lines.length * size * 1.02 <= ph - pad * 2 - 40) break;
    }
    ctx.fillStyle = '#26211a';
    ctx.textBaseline = 'top';
    const lh = size * 1.02;
    lines.slice(0, Math.floor((ph - pad * 2 - 40) / lh)).forEach((l, k) => ctx.fillText(l, -pw / 2 + pad, -ph / 2 + pad + 10 + k * lh));
    ctx.font = `500 22px ${this.fontReady ? 'Inter, ' : ''}system-ui, sans-serif`;
    ctx.fillStyle = 'rgba(38,33,26,0.6)';
    ctx.fillText(`— ${n.name}`, -pw / 2 + pad, ph / 2 - pad - 18);
    // push pin
    this.pin(0, -ph / 2 + 16, PINS[Math.floor(rnd(n.id, 7) * PINS.length)]);
    ctx.restore();
  }

  private card(title: string, body: string, cx: number, cy: number, rot = -0.02) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.font = `600 52px ${HAND}`;
    const tw = Math.max(ctx.measureText(title).width, 300);
    ctx.font = `600 32px ${HAND}`;
    const lines = wrap(ctx, body, Math.max(tw, 420));
    const w = Math.max(tw, 420) + 60;
    const h = 100 + lines.length * 36;
    ctx.shadowColor = 'rgba(0,0,0,0.45)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 7;
    ctx.fillStyle = '#f1ecd9';
    ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#26211a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = `600 52px ${HAND}`;
    ctx.fillText(title, 0, -h / 2 + 22);
    ctx.font = `600 32px ${HAND}`;
    lines.forEach((l, k) => ctx.fillText(l, 0, -h / 2 + 82 + k * 36));
    this.pin(0, -h / 2 + 14, PINS[0]);
    ctx.restore();
  }

  private tag(text: string, cx: number, cy: number) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-0.03);
    ctx.font = `600 34px ${HAND}`;
    const w = ctx.measureText(text).width + 50;
    ctx.shadowColor = 'rgba(0,0,0,0.45)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 5;
    ctx.fillStyle = '#f4efe0';
    ctx.fillRect(-w / 2, -26, w, 52);
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#7a1f16';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 0, 2);
    ctx.restore();
  }

  private pin(x: number, y: number, col: string) {
    const ctx = this.ctx;
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 4;
    const g = ctx.createRadialGradient(x - 4, y - 4, 1, x, y, 13);
    g.addColorStop(0, '#fff');
    g.addColorStop(0.25, col);
    g.addColorStop(1, '#000');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowColor = 'transparent';
  }

  dispose() {
    board.listeners.delete(this.listener);
    this.tex.dispose();
    (this.mesh.material as THREE.Material).dispose();
    this.mesh.geometry.dispose();
  }
}
