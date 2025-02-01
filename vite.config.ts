import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { writeFileSync, copyFileSync } from 'fs';

// Custom plugin to copy manifest and icons
const copyManifest = () => {
  return {
    name: 'copy-manifest',
    closeBundle: () => {
      // Copy manifest.json
      copyFileSync('manifest.json', 'dist/manifest.json');
      
      // Create icons directory
      const iconsDir = resolve('dist', 'icons');
      try {
        copyFileSync('public/icons/icon16.png', 'dist/icons/icon16.png');
        copyFileSync('public/icons/icon48.png', 'dist/icons/icon48.png');
        copyFileSync('public/icons/icon128.png', 'dist/icons/icon128.png');
      } catch (err) {
        console.error('Error copying icons:', err);
      }
    }
  };
};

export default defineConfig({
  plugins: [react(), copyManifest()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        content: 'src/content.tsx'
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  }
});