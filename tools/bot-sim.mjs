// AI-companion soak test: node tools/bot-sim.mjs [seconds] [level]
// Starts AI mode, stops the render loop, then walks a scripted player along real routes while
// stepping only the companion AI at 30 Hz, and reports how well the bots keep up.
import { chromium } from 'playwright-core';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('docs');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.glb': 'model/gltf-binary', '.json': 'application/json', '.ogg': 'audio/ogg', '.m4a': 'audio/mp4', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f)) return res.writeHead(404), res.end();
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(4184, r));
const browser = await chromium.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto('http://localhost:4184/');
await page.evaluate(() => localStorage.setItem('ob.settings2', JSON.stringify({ quality: 'low' })));
await page.reload();
await page.waitForSelector('#boot .start:not(.hidden)', { timeout: 120000 });
await page.click('#boot .start');
await page.waitForSelector('#menu', { timeout: 120000 });
const seconds = Number(process.argv[2] || 240);
const level = Number(process.argv[3] || 0);
const report = await page.evaluate(
  async ([seconds, level]) => {
    const g = window.__game;
    await g.ui.actions.ai(level === 0 ? 'escape' : 'endless', level);
    await new Promise((r) => setTimeout(r, 1500));
    g.running = false; // logic only from here on
    g.entities.list.length = 0;
    const cache = g.world.cache;
    const c = g.world.def.cell;
    const p = g.player;
    let seed = 42;
    const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
    const stats = g.bots.list.map((b) => ({ name: b.name, dSum: 0, dMax: 0, far8: 0, far15: 0, teleports: 0, stalls: 0, flips: 0, n: 0, lastYaw: b.yaw, lastPos: b.pos.clone(), inWall: 0, stuckSeen: 0 }));
    const dt = 1 / 30;
    let t = 0;
    let route = [];
    let speed = 1.6;
    let pause = 0;
    let routes = 0;
    while (t < seconds) {
      // the scripted player: walk to a random cell 6..16 away, sometimes sprint, sometimes stop and look around
      if (!route.length) {
        if (pause <= 0 && rnd() < 0.3) pause = 2 + rnd() * 6;
        const [px, pz] = [Math.floor(p.pos.x / c), Math.floor(p.pos.z / c)];
        for (let k = 0; k < 20 && !route.length; k++) {
          const tx = px + Math.round((rnd() - 0.5) * 32);
          const tz = pz + Math.round((rnd() - 0.5) * 32);
          const pth = window.__findPath(cache, px, pz, tx, tz, undefined, 3000);
          if (pth && pth.length > 5) route = pth.slice(1).map(([x, z]) => ({ x: (x + 0.5) * c, z: (z + 0.5) * c }));
        }
        speed = rnd() < 0.25 ? 5.2 : rnd() < 0.15 ? 1.0 : 2.8;
        p.crouching = speed === 1.0;
        routes++;
      }
      if (pause > 0) {
        pause -= dt;
        p.speed = 0;
        p.yaw += dt * 0.6;
      } else if (route.length) {
        const w = route[0];
        const dx = w.x - p.pos.x;
        const dz = w.z - p.pos.z;
        const d = Math.hypot(dx, dz);
        const step = Math.min(d, speed * dt);
        p.pos.x += (dx / (d || 1)) * step;
        p.pos.z += (dz / (d || 1)) * step;
        p.yaw = Math.atan2(-dx, -dz);
        p.speed = speed;
        if (d < 0.2) route.shift();
      }
      g.camera.position.set(p.pos.x, 1.6, p.pos.z);
      g.camera.rotation.set(0, p.yaw, 0, 'YXZ');
      g.camera.updateMatrixWorld();
      g.bots.update(dt);
      t += dt;
      g.bots.list.forEach((b, i) => {
        const s = stats[i];
        const d = Math.hypot(b.pos.x - p.pos.x, b.pos.z - p.pos.z);
        s.n++;
        s.dSum += d;
        s.dMax = Math.max(s.dMax, d);
        if (d > 8) s.far8++;
        if (d > 15) s.far15++;
        const jump = Math.hypot(b.pos.x - s.lastPos.x, b.pos.z - s.lastPos.z);
        if (jump > 1.0) s.teleports++;
        const r = g.collider.resolve(b.pos.x, b.pos.z, 0.27);
        if (Math.hypot(r.x - b.pos.x, r.z - b.pos.z) > 0.02) s.inWall++;
        let dy = Math.abs(b.yaw - s.lastYaw) % (Math.PI * 2);
        if (dy > Math.PI) dy = Math.PI * 2 - dy;
        if (dy > 1.2) s.flips++;
        if (dy > 0.6 && b.mode === 'follow' && p.speed > 0) s.followSnaps = (s.followSnaps ?? 0) + 1;
        if (b.stuckT > 0 && s.stuckSeen === 0) s.stalls++;
        s.stuckSeen = b.stuckT;
        s.lastYaw = b.yaw;
        s.lastPos.copy(b.pos);
      });
      if ((t * 30) % 300 < 1) await new Promise((r) => setTimeout(r, 0));
    }
    return {
      seconds,
      routes,
      bots: stats.map((s) => ({
        name: s.name,
        meanDist: +(s.dSum / s.n).toFixed(2),
        maxDist: +s.dMax.toFixed(1),
        pctOver8m: +((100 * s.far8) / s.n).toFixed(1),
        pctOver15m: +((100 * s.far15) / s.n).toFixed(1),
        teleports: s.teleports,
        stallEpisodes: s.stalls,
        bigTurnsPerMin: +((s.flips / seconds) * 60).toFixed(1),
        framesInsideWalls: s.inWall,
        snapsWhileFollowingPerMin: +(((s.followSnaps ?? 0) / seconds) * 60).toFixed(1),
      })),
    };
  },
  [seconds, level],
);
console.log(JSON.stringify(report, null, 1));
if (errors.length) console.log('ERRORS:\n' + errors.slice(0, 10).join('\n'));
await browser.close();
server.close();
