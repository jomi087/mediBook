import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true, // Makes describe, it, expect available globally ie, No need to import describe, it, expect, beforeEach, etc. from vitest
    environment: 'jsdom', // Simulates a browser for React components
  },
});
