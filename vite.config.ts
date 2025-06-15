import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow external connections
    port: 5173,
    strictPort: false, // Try other ports if 5173 is busy
    open: false, // Don't auto-open browser
    cors: true,
    hmr: {
      port: 5173,
      host: 'localhost'
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: false,
    cors: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  define: {
    global: 'globalThis',
  },
})