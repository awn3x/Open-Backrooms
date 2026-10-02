// Blackout screenshots: node tools/dark-shots.mjs [outDir]. Builds must be in docs/.
import { chromium } from 'playwright-core';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('docs');
const out = path.resolve(process.argv[2] || 'tools/out/dark');
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
await new Promise((r) => server.listen(4182, r));
const browser = await chromium.launch({
  executablePath: process.env.CHROME || '/opt/pw-browsers/chromium',
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto('http://localhost:4182/');
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
  await g.enterLevel(0);
  g.ui.closeModal();
  g.paused = false;
  g.player.teleport(14, 2, 1.57);
});
await page.waitForTimeout(5000);
const shot = async (name, pitch, flash) => {
  await page.evaluate(([pitch, flash]) => {
    const g = window.__game;
    g.player.pitch = pitch;
    g.player.flashlight = flash;
    if (g.lights?.flashlight) g.player.flashOn = flash;
    g.post.resetHistory(g.camera);
  }, [pitch, flash]);
  await page.waitForTimeout(Number(process.env.WAIT || 3500));
  await page.screenshot({ path: path.join(out, name + '.png'), animations: 'disabled' });
};
await shot('lit_up', 0.9, false);
await page.evaluate(() => { const g = window.__game; g.startPowerDown(); g.powerEvt.t = -1e6; g.powerEvt.r = -4; });
await page.waitForTimeout(6000);
console.log(await page.evaluate(() => JSON.stringify(window.__game.powerEvt)));
await shot('dark_up', 0.9, false);
await shot('dark_ahead', 0.1, false);
await shot('dark_up_flash', 0.9, true);
if (process.env.PROBE) {
  for (const [name, key, val] of [['flash_nobloom', 'bloom', 0], ['flash_noao', 'ssao', false], ['flash_noblur', 'blur', 0]]) {
    await page.evaluate(([k, v]) => {
      const g = window.__game;
      g.__saved = { ...g.post.s };
      g.post.s[k] = v;
    }, [key, val]);
    await shot(name, 0.9, true);
    await page.evaluate(() => Object.assign(window.__game.post.s, window.__game.__saved));
  }
}
if (errors.length) console.log('ERRORS:\n' + errors.slice(0, 20).join('\n'));
await browser.close();
server.close();
