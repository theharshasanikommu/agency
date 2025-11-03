import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import alias from '@rollup/plugin-alias'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    mdx(),
    alias({
      entries: [
        { find: '@', replacement: resolve(__dirname, './src') },
        { find: '@blog', replacement: resolve(__dirname, './blog') }
      ]
    })
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        // Dev proxy target: match the server PORT. Default to 5001 if 5000 is in use on dev machines.
        target: process.env.SERVER_URL || 'http://localhost:5001',
        changeOrigin: true
      }
    }
  },
  optimizeDeps: {
    include: ['react-router-dom', 'framer-motion']
  },
  build: {
    rollupOptions: {
      // External packages that shouldn't be bundled
      external: ['/blog/**/*.mdx'],
    }
  }
})
