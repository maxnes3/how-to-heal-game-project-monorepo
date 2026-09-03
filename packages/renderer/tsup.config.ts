import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'es2022',
  bundle: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  platform: 'browser',
  noExternal: ['pixi.js'],
});
