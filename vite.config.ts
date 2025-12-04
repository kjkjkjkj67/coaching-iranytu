import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Betöltjük a környezeti változókat (pl. API_KEY a Vercelről)
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Ez teszi lehetővé, hogy a kódban a process.env.API_KEY működjön
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})