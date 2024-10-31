import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()], // Voeg de Vue plugin toe
  test: {
    environment: 'jsdom', // of 'node' afhankelijk van je testbehoeften
    globals: true, // Zorg ervoor dat globale variabelen zoals describe en it beschikbaar zijn
  },
})
