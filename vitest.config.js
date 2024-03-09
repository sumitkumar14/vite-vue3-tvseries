import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({

  plugins: [ vue({ 
    template: { transformAssetUrls }
  }),vuetify({
    autoImport: true,
  }),],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
      '.css',
    ],
  },
  test: {
    globals: true,
    environmentMatchGlobs: [
      ['packages/{vue,vue-compat,runtime-dom}/**', 'jsdom'],
    ],
    coverage: {
      provider: 'india',
      reporter: ['text', 'html'],
    },
  },
})