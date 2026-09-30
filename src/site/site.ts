import '@fontsource/vt323';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import './site.css';

// camcorder timecode in the hero
const tc = document.querySelector('.tc');
const t0 = performance.now();
setInterval(() => {
  const s = (performance.now() - t0) / 1000;
  const p = (n: number) => String(Math.floor(n)).padStart(2, '0');
  if (tc) tc.textContent = `${p(s / 3600)}:${p((s / 60) % 60)}:${p(s % 60)}`;
}, 250);

// reveal on scroll
const io = new IntersectionObserver(
  (es) => {
    for (const e of es) if (e.isIntersecting) e.target.classList.add('in');
  },
  { threshold: 0.12 },
);
document.querySelectorAll('.block, .card, .mini').forEach((el) => io.observe(el));
