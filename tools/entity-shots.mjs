// Close-ups of each entity model: node tools/entity-shots.mjs [outDir] (KINDS=hound,howler,...) Builds must be in docs/.
import { chromium } from 'playwright-core';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('docs');
const out = path.resolve(process.argv[2] || 'tools/out/entities');
fs.mkdirSync(out, { recursive: true });
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.glb': 'model/gltf-binary', '.json': 'application/json', '.ogg': 'audio/ogg', '.m4a': 'audio/mp4', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f)) return res.writeHead(404), res.end();
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(4186, r));
const browser = await chromium.launch({
  executablePath: process.env.CHROME || '/opt/pw-browsers/chromium',
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto('http://localhost:4186/');
await page.evaluate((q) => localStorage.setItem('ob.settings2', JSON.stringify({ quality: q })), process.env.QUALITY || 'medium');
await page.reload();
await page.waitForSelector('#boot .start:not(.hidden)', { timeout: 120000 });
await page.click('#boot .start');
await page.waitForSelector('#menu', { timeout: 120000 });
await page.evaluate(async () => {
  const g = window.__game;
  g.menuMode = false;
  g.ui.enterGame(false);
  g.roomSeed = 1234567;
  await g.enterLevel(Number(new URLSearchParams(location.search).get('lvl') || 0));
  g.ui.closeModal();
  g.paused = false;
});
await page.waitForTimeout(4000);
const kinds = (process.env.KINDS || 'hound,howler,smiler,faceling').split(',');
let i = 0;
for (const kind of kinds) {
  await page.evaluate(async (kind) => {
    const g = window.__game;
    g.running = true;
    const em = g.entities;
    for (const e of [...em.list]) em.remove?.(e);
    em.list.length = 0;
    em.authority = false;
    const x = 1.2, z = -1.5;
    const e = await em.spawn(kind, x, z);
    e.visible = 1;
    e.netTarget?.copy(e.pos);
    e.yaw = 0;
  }, kind);
  await page.waitForTimeout(2500);
  for (const [dx, dy, dz, ty] of [[0, 1.5, 1.6, 1.1], [1.6, 1.2, 0.6, 0.9]]) {
    await page.evaluate(([dx, dy, dz, ty]) => {
      const g = window.__game;
      g.running = false;
      const e = g.entities.list[0];
      const cam = g.camera;
      cam.position.set(e.pos.x + dx, dy, e.pos.z + dz);
      cam.lookAt(e.pos.x, ty, e.pos.z);
      cam.updateMatrixWorld();
      g.lights.update(g.world, cam, 0.016, g.time, 1);
      g.post.resetHistory(cam);
      for (let k = 0; k < 3; k++) g.post.render(g.scene, cam, g.time);
    }, [dx, dy, dz, ty]);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(out, `${kind}_${i++}.png`), animations: 'disabled' });
  }
}
if (errors.length) console.log('ERRORS:\n' + errors.slice(0, 20).join('\n'));
await browser.close();
server.close();
