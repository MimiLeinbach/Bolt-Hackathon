import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This allows external connections
    port: 5173,
    strictPort: true, // Don't try other ports if 5173 is busy
    hmr: {
      port: 5173,
    },
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
  },
})