import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// base './' keeps every URL relative, so the same build works on GitHub Pages
// (served from /Open-Backrooms/) and on Vercel (served from /).
// The build is written to docs/ and committed: GitHub Pages serves main:/docs.
export default defineConfig({
  base: './',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    target: 'es2022',
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 2000,
    rolldownOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        play: resolve(import.meta.dirname, 'play/index.html'),
      },
    },
  },
  worker: { format: 'es' },
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
} as any);
