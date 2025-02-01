import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss'; // Import the new package
import autoprefixer from 'autoprefixer';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
});