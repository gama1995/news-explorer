import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Keep the Vite configuration at the project root so the React plugin is loaded.
export default defineConfig({
  plugins: [react()],
})
