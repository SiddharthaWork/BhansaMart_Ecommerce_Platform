import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    hmr: {
      overlay: false, // Disable the error overlay
    },
    watch: {
      usePolling: false, // Disable polling
    },
  },
  optimizeDeps: {
    exclude: ["@iconify/react"], // Exclude iconify from optimization if you're using it
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },
});
