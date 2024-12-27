import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // дозволяє доступ з локальної мережі
    port: 5173,
    strictPort: true
  },
  base: '/', // базовий URL для всього застосунку
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  }
})