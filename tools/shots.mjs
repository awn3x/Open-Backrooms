// Headless screenshot / smoke-test harness.
// Usage: node tools/shots.mjs [outDir] [level] [shots...]
//   Serves dist/ on a local port, boots the game in Chromium (SwiftShader
//   WebGL), starts a solo run, poses the camera and writes PNGs. Fails on
//   uncaught page errors.
import { chromium } from 'playwright-core';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('docs');
const out = path.resolve(process.argv[2] || 'tools/out/shots');
const level = Number(process.argv[3] || 0);
fs.mkdirSync(out, { recursive: true });

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.glb': 'model/gltf-binary', '.json': 'application/json', '.ogg': 'audio/ogg', '.m4a': 'audio/mp4', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f)) {
    res.writeHead(404);
    return res.end();
  }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(4180, r));

const browser = await chromium.launch({
  executablePath: process.env.CHROME || undefined,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text());
  if (process.env.VERBOSE) console.log('[page]', m.type(), m.text());
});
await page.goto('http://localhost:4180/');
if (process.env.QUALITY) {
  await page.evaluate((q) => localStorage.setItem('ob.settings2', JSON.stringify({ quality: q })), process.env.QUALITY);
  await page.reload();
}
await page.waitForSelector('#boot .start:not(.hidden)', { timeout: 120000 });
await page.screenshot({ path: path.join(out, '00_boot.png') });
await page.click('#boot .start');
await page.waitForSelector('#menu', { timeout: 120000 }).catch(async (e) => { await page.screenshot({ path: path.join(out, 'fail.png') }); console.log(errors.join('\n')); throw e; });
await page.waitForTimeout(4000);
await page.screenshot({ path: path.join(out, '01_menu.png') });

// start solo directly on the requested level, then pose the camera
await page.evaluate(async (lvl) => {
  const g = window.__game;
  g.menuMode = false;
  g.ui.enterGame(false);
  g.roomSeed = 1234567;
  await g.enterLevel(lvl);
}, level);
await page.waitForTimeout(6000);

const poses = [
  { name: 'spawn', dx: 0, dz: 0, yaw: 2.3, pitch: 0.0 },
  { name: 'out1', dx: 12, dz: 1.2, yaw: 1.57, pitch: -0.05 },
  { name: 'out2', dx: 20, dz: -9, yaw: 0.6, pitch: 0.05 },
  { name: 'out3', dx: -20, dz: 16, yaw: -2.4, pitch: -0.1 },
];
for (const p of poses) {
  await page.evaluate(async (p) => {
    const g = window.__game;
    const base = g.level === 0 ? { x: 1.22, z: 1.22 } : { x: g.world.def.cell * 0.5, z: g.world.def.cell * 0.5 };
    g.player.teleport(base.x + p.dx, base.z + p.dz, p.yaw);
    g.player.pitch = p.pitch;
    const r = g.collider.resolve(g.player.pos.x, g.player.pos.z, 0.3);
    g.player.pos.x = r.x;
    g.player.pos.z = r.z;
    g.post.resetHistory(g.camera);
  }, p);
  await page.waitForTimeout(Number(process.env.WAIT || 5000));
  await page.screenshot({ path: path.join(out, `L${level}_${p.name}.png`), timeout: 180000 });
}
const stats = await page.evaluate(() => {
  const g = window.__game;
  return { fps: g.debug.fps, calls: g.debug.calls, tris: g.debug.tris, chunks: g.world.chunks.size, pos: g.player.pos.toArray() };
});
console.log(JSON.stringify(stats));
if (errors.length) console.log('ERRORS:\n' + errors.slice(0, 20).join('\n'));
await browser.close();
server.close();
process.exit(errors.length ? 1 : 0);
