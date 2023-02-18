import react from '@vitejs/plugin-react-swc';
import Inspect from 'vite-plugin-inspect';

import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  server: {
    https: {
      key: './secure/kronos.dev-key.pem',
      cert: './secure/kronos.dev.pem',
    },
    host: 'kronos.dev',
    port: 443,
    proxy: {
      '/api': {
        target: 'https://kronos.dev:3443/',
        changeOrigin: !0,
        secure: !1,
      },
    },
  },
  plugins: [Inspect(), react()],
  resolve: {
    alias: {
      '@Components': resolve(__dirname, './src/route/(components)/'),
      '@Store': resolve(__dirname, './src/route/app/(store)/'),
      '@App': resolve(__dirname, './src/route/app/'),
      '@Web': resolve(__dirname, './src/route/web/'),
      '@Assets': resolve(__dirname, './src/assets/'),
      '@Types': resolve(__dirname, './src/types/'),
      '@Utils': resolve(__dirname, './src/utils/'),
      '@Lib': resolve(__dirname, './src/lib/'),
    },
  },
});
