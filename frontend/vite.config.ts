import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/nasapower': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/copernicus': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/metrics': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/agro': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});
