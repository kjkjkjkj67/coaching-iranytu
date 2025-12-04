import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Ez szükséges ahhoz, hogy a process.env.API_KEY működjön a böngészőben is
    'process.env': process.env
  }
})