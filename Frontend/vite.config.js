import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: process.env.VITE_PORT || 5317,
    watch: {
      usePolling: true,
    },
  },
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
})
