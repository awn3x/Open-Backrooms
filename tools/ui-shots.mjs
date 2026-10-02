// UI screenshot harness: node tools/ui-shots.mjs [outDir]
// Boots the built game (docs/), starts solo, and captures every menu / panel.
import { chromium } from 'playwright-core';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('docs');
const out = path.resolve(process.argv[2] || 'tools/out/ui');
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
await new Promise((r) => server.listen(4181, r));
const browser = await chromium.launch({
  executablePath: process.env.CHROME || '/opt/pw-browsers/chromium',
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto('http://localhost:4181/');
await page.evaluate((quality) => {
  localStorage.setItem('ob.settings2', JSON.stringify({ quality }));
  // a crowded board, so the overflow pile and the full notice show up
  const texts = ['Arrows near the wet carpet LIE. Head for the red ones.', 'If you hear clicking, do NOT run. Walk.', 'Almond water in the room with three outlets', 'kiosk guy owes me 20 BC', 'Day 14. The hum is louder near the vents.', 'DONT TRUST THE SMILE', 'whoever keeps pinning memes: stop', 'Exit was two lefts and a right from the couch. It moved.', 'hello from level 2!!', 'I counted the lights. 4,112. Then I lost count.', 'Turn your flashlight off when you see it.', 'missing: my friend Theo. blue hoodie. tell him to come back to base', 'the howler only moves when you look away', 'sitting on the couch heals you? maybe placebo', 'Level 1 garages have batteries in the crates'];
  const now = Date.now();
  localStorage.setItem('ob.board2', JSON.stringify(texts.map((text, i) => ({ id: 'n' + i, author: 'a' + (i % 6), name: ['Moth', 'Wanderer', 'Lamp', 'Kit', 'Theo', 'Rae'][i % 6], text, t: now - (20 - i) * 3600e3, tier: 'month', expires: now + 20 * 86400e3, mine: false }))));
}, process.env.QUALITY || 'low');
await page.reload();
await page.waitForSelector('#boot .start:not(.hidden)', { timeout: 120000 });
await page.screenshot({ path: path.join(out, '00_boot.png') });
await page.click('#boot .start');
await page.waitForSelector('#menu', { timeout: 120000 });
await page.waitForTimeout(3000);
await page.screenshot({ path: path.join(out, '01_menu.png') });
await page.evaluate(async () => {
  const g = window.__game;
  g.menuMode = false;
  g.ui.enterGame(false);
  g.roomSeed = 1234567;
  await g.enterLevel(0);
});
await page.waitForTimeout(4000);
const shot = async (name, fn) => {
  await page.evaluate(fn);
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(out, name + '.png'), animations: 'disabled' });
};
await shot('02_hud', () => window.__game.ui.closeModal());
await shot('03_pause', () => window.__game.ui.openPause());
await shot('04_settings', () => window.__game.ui.openSettings());
await shot('05_how', () => window.__game.ui.openHow());
await shot('06_shop', () => window.__game.ui.openPanel('shop'));
await shot('07_locker', () => window.__game.ui.openPanel('locker'));
await shot('08_board', () => window.__game.ui.openPanel('board'));
await shot('09_death', () => { window.__game.ui.closeModal(); window.__game.ui.showDeath('smiler'); });
await shot('10_ending', () => { window.__game.ui.hideDeath(); window.__game.ui.showEnding(); });
await shot('11_board3d_setup', () => {
  const g = window.__game;
  g.ui.closeModal();
  g.paused = false;
  g.player.teleport(-3.35, -2.2, Math.PI / 2);
  g.player.pitch = 0.05;
  g.post?.resetHistory?.(g.camera);
});
await page.waitForTimeout(2500);
await page.screenshot({ path: path.join(out, '12_board3d.png'), animations: 'disabled' });
if (process.env.EXTRA) await shot('11_extra', new Function(process.env.EXTRA));
if (errors.length) console.log('ERRORS:\n' + errors.slice(0, 20).join('\n'));
await browser.close();
server.close();
