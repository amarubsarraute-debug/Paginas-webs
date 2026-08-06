import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  // Rutas relativas: el sitio vive en una subcarpeta de Hostinger (/radiant-skin/).
  base: './',
  cacheDir: './.vite',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {'@': path.resolve(__dirname, './src')},
  },
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
});
