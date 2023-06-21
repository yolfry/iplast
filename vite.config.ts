import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), checker({
    typescript: true
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  base: './',
})