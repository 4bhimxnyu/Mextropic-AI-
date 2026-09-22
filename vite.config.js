import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // host: true binds 0.0.0.0 instead of localhost, so other devices on the
  // same Wi-Fi (your phone) can reach it. preview gets the same treatment.
  server:  { port: 5180, host: true },
  preview: { port: 5180, host: true },
})
