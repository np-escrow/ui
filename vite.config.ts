import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0', "05ab-5-58-122-240.ngrok-free.app"]}
})
