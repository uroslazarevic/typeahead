import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },

  e2e: {
    video: false,
    baseUrl: process.env.VITE_CLIENT_URL,
    env: {
      clientUrl: process.env.VITE_CLIENT_URL,
      'cypress/globals': true,
    },
  },
});
