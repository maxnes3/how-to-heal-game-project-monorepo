import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: false,
    alias: {
      '@app': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['react-i18next'],
  },
});
