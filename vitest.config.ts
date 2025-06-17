import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc'; // Assuming you use SWC with React

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts', // Optional: if you need a setup file
    css: true, // If you want to process CSS (e.g. for CSS Modules)
  },
  resolve: {
    alias: {
      '@': '/src', // Match your tsconfig.json paths alias
    },
  },
});
