import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 4444,
  },
  build: {
    outDir: 'dist',
    assetsDir: '',
  },
});
