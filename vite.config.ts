import react from '@vitejs/plugin-react';
import Inspect from 'vite-plugin-inspect';
import basicSsl from '@vitejs/plugin-basic-ssl';

import { splitVendorChunkPlugin, defineConfig } from 'vite';

import { setDefaultResultOrder } from 'node:dns';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  server: {
    host: 'kronos.dev',
    port: 443,
    https: {
      key: readFileSync('secure/kronos.dev-key.pem', 'utf8'),
      cert: readFileSync('secure/kronos.dev.pem', 'utf8'),
    },
    proxy: {
      '/api': {
        target: 'https://kronos.dev:3443/',
        changeOrigin: !0,
        secure: !1,
      },
    },
  },
  build: {
    watch: { include: 'src/**/*.{ts,tsx,html,css}' },
    manifest: !0,
    assetsDir: 'public',
    target: ['es2021', 'chrome100', 'safari13'],
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  plugins: [
    Inspect(),
    // compress({
    //   verbose: !0,
    //   extensions: ['js', 'css', 'ts', 'tsx', 'html'],
    // }),
    react({ include: 'src/**/*.{ts,tsx,html,css}' }),
    // reactPlugin({
    //   injectReact: !1,
    //   removeDevtoolsInProd: !0,
    // }),
    splitVendorChunkPlugin(),
    basicSsl(),
  ],
  resolve: {
    alias: {
      '@Components': resolve(__dirname, './src/components/'), // "@Components/*": ["components/*"]
      '@Template': resolve(__dirname, './src/components/template/'), // "@Template/*": ["components/template/*"]
      '@SVG': resolve(__dirname, './src/assets/svg/'), // "@SVG/*": ["assets/svg/*"]
      '@Types': resolve(__dirname, './src/types/'), // "@Types/*": ["types/*"]
      '@Context': resolve(__dirname, './src/context/'), // "@Context/*": ["context/*"]
      '@Utils': resolve(__dirname, './src/utils/'), // "@Utils/*": ["utils/*"]
      '@Local': resolve(__dirname, './src/'), // "@Local/*": ["*"]
    },
  },
});
