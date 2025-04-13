import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  base: '',
  build: {
    rollupOptions: {
      output: {
        format: 'iife'
      }
    },
    target: 'esnext',
    sourcemap: true,
    emptyOutDir: true
  }
});