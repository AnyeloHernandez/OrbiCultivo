import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const backendTarget = process.env.VITE_BACKEND_URL || 'http://localhost:8000';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: backendTarget,
        changeOrigin: true,
      },
      '/nasapower': {
        target: backendTarget,
        changeOrigin: true,
      },
      '/copernicus': {
        target: backendTarget,
        changeOrigin: true,
      },
      '/metrics': {
        target: backendTarget,
        changeOrigin: true,
      },
      '/agro': {
        target: backendTarget,
        changeOrigin: true,
      },
    },
  },
});
