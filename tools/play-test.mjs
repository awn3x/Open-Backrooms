// Gameplay smoke test: AI mode, entity rendering, walking, UI panels.
import { chromium } from 'playwright-core';
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const root = path.resolve('dist');
const out = path.resolve(process.argv[2] || 'tools/out/play');
fs.mkdirSync(out, { recursive: true });
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.json': 'application/json', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => { let p = decodeURIComponent(new URL(req.url, 'http://x').pathname); if (p.endsWith('/')) p += 'index.html'; const f = path.join(root, p); if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); });
await new Promise((r) => server.listen(4183, r));
const b = await chromium.launch({ executablePath: process.env.CHROME, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
const page = await b.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e));
page.on('console', (m) => m.type() === 'error' && !m.text().includes('pointer') && errors.push(m.text()));
await page.goto('http://localhost:4183/play/');
await page.waitForSelector('#boot .start:not(.hidden)', { timeout: 120000 });
await page.click('#boot .start');
await page.waitForSelector('#menu', { timeout: 120000 });
await page.click('.mbtn[data-a="ai"]');
await page.waitForTimeout(9000);
await page.screenshot({ path: path.join(out, 'ai_start.png') });
// walk forward for a few seconds
const before = await page.evaluate(() => window.__game.player.pos.toArray());
await page.keyboard.down('KeyW');
await page.waitForTimeout(3000);
await page.keyboard.up('KeyW');
const after = await page.evaluate(() => window.__game.player.pos.toArray());
console.log('moved', Math.hypot(after[0] - before[0], after[2] - before[2]).toFixed(2), 'm');
// entities in front of the camera
await page.evaluate(async () => {
  const g = window.__game;
  g.player.teleport(12, 1.2, Math.PI / 2 + Math.PI);
  const em = g.entities;
  const p = g.player.pos;
  const fwd = { x: -Math.sin(g.player.yaw), z: -Math.cos(g.player.yaw) };
  const c = await em.spawn('crawler', p.x + fwd.x * 3.5, p.z + fwd.z * 3.5);
  c.yaw = g.player.yaw;
  const w = await em.spawn('watcher', p.x + fwd.x * 6 + 1.2, p.z + fwd.z * 6);
  w.yaw = g.player.yaw;
  em.authority = false; // freeze AI for the shot
  for (const e of em.list) e.netTarget.copy(e.pos);
});
await page.waitForTimeout(4000);
await page.screenshot({ path: path.join(out, 'entities.png') });
await page.evaluate(async () => {
  const g = window.__game;
  const em = g.entities;
  for (const e of [...em.list]) { em.remove(e); }
  em.list = [];
  g.player.teleport(12, 1.2, Math.PI / 2 + Math.PI);
  g.player.flashlight = true;
  const p = g.player.pos;
  const fwd = { x: -Math.sin(g.player.yaw), z: -Math.cos(g.player.yaw) };
  const s = await em.spawn('smiler', p.x + fwd.x * 5, p.z + fwd.z * 5);
  s.visible = 1;
  g.player.flashlight = false;
  window.__powerOff = true;
  g.startPowerDown();
});
await page.waitForTimeout(3500);
await page.screenshot({ path: path.join(out, 'smiler_dark.png') });
// UI panels
await page.evaluate(() => { const g = window.__game; g.entities.authority = true; g.ui.openPanel('shop'); });
await page.waitForTimeout(800);
await page.screenshot({ path: path.join(out, 'shop.png') });
await page.evaluate(() => window.__game.ui.openPanel('board'));
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(out, 'board.png') });
await page.evaluate(() => window.__game.ui.openSettings());
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(out, 'settings.png') });
await page.evaluate(() => { window.__game.ui.closeModal(); window.__game.ui.openPause(); });
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(out, 'pause.png') });
console.log(JSON.stringify(await page.evaluate(() => ({ bots: window.__game.bots.list.length, coins: window.__game.ui && document.querySelector('.coins')?.textContent }))));
if (errors.length) console.log('ERRORS:\n' + [...new Set(errors)].slice(0, 15).join('\n'));
await b.close(); server.close();
