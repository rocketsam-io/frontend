import vuePugPlugin from 'vue-pug-plugin'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        preprocessOptions: {
          // 'preprocessOptions' is passed through to the pug compiler
          plugins: [vuePugPlugin]
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./public', import.meta.url))
    }
  },
  server: {
    host: true,
    port: 8080,
    watch: {
      usePolling: true
    }
  }
})
