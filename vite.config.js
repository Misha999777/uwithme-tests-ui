import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    host: true,
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'katex',
              test: /node_modules[\\/]katex/,
            },
            {
              name: 'highlight',
              test: /node_modules[\\/](highlight|lowlight)/,
            },
          ],
        },
      },
    },
  },
})
