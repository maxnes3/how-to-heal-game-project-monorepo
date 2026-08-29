import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@game/renderer': path.resolve(__dirname, '../../packages/renderer/dist/index.js'),
    },
  },
});
