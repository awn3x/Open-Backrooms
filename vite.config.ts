import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// base './' keeps every URL relative, so the exact same build works on
// GitHub Pages (served from /Open-Backrooms/) and on Vercel (served from /).
export default defineConfig({
  base: './',
  build: {
    target: 'es2022',
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 2000,
    rolldownOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        play: resolve(__dirname, 'play/index.html'),
      },
    },
  },
  worker: { format: 'es' },
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
} as any);
