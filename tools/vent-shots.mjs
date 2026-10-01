// Close-ups of the nearest wall vents: node tools/vent-shots.mjs [outDir]. Builds must be in docs/.
import { chromium } from 'playwright-core';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('docs');
const out = path.resolve(process.argv[2] || 'tools/out/vents');
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
await new Promise((r) => server.listen(4185, r));
const browser = await chromium.launch({
  executablePath: process.env.CHROME || '/opt/pw-browsers/chromium',
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto('http://localhost:4185/');
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
const vents = await page.evaluate(() => {
  const g = window.__game;
  const out = [];
  for (const c of g.world.chunks.values()) for (const p of c.layout.props) if (p.kind === 'vent_wall') out.push(p);
  const me = g.player.pos;
  out.sort((a, b) => Math.hypot(a.x - me.x, a.z - me.z) - Math.hypot(b.x - me.x, b.z - me.z));
  return out.slice(0, 3);
});
console.log(JSON.stringify(vents));
let i = 0;
for (const v of vents.slice(0, 2)) {
  for (const [dist, side] of [[1.2, 0], [0.8, 0.5]]) {
    await page.evaluate(([v, dist, side]) => {
      const g = window.__game;
      const nx = Math.sin(v.rot), nz = Math.cos(v.rot);
      const x = v.x + nx * dist + nz * side, z = v.z + nz * dist - nx * side;
      const eye = v.y < 1 ? 1.0 : 1.62;
      g.player.teleport(x, z, Math.atan2(x - v.x, z - v.z));
      g.running = false; // freeze the loop and aim the camera exactly
      const cam = g.camera;
      cam.position.set(x, eye, z);
      cam.lookAt(v.x, v.y, v.z);
      cam.updateMatrixWorld();
      g.lights.update(g.world, cam, 0.016, g.time, 1);
      g.post.resetHistory(cam);
      for (let k = 0; k < 3; k++) g.post.render(g.scene, cam, g.time);
    }, [v, dist, side]);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(out, `vent_${i++}.png`), animations: 'disabled' });
  }
}
if (errors.length) console.log('ERRORS:\n' + errors.slice(0, 20).join('\n'));
await browser.close();
server.close();
