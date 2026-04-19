import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ingest': {
        target: 'https://eu.posthog.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ingest/, ''),
      },
    },
  },
  test: {
    // Додаємо виключення папки tests
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/tests/**', // Playwright тести лежать тут, ігноруємо їх
    ],
    globals: true,
  },
});