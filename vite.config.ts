import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import routesBasename from "./src/globalVariables/routesBasename"

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${routesBasename}/`,
  plugins: [react()]
})
