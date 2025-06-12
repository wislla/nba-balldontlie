// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import EnvironmentPlugin from 'vite-plugin-environment'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    EnvironmentPlugin([
      'VITE_BASE_URL',
      'VITE_BALLDONTLIE_KEY',
      'VITE_TIMEOUT',
    ]),
  ],
  build: {
    outDir: 'dist', 
    emptyOutDir: true 
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
