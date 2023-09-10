import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import environment from 'vite-plugin-environment'; // convert import.meta.env to process.env

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), environment('all')],
  server: {
    host: true, // Enable docker port mapping
  },
});
