import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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