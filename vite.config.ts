import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  root: "client", // teraz Vite traktuje "client" jako katalog główny
  plugins: [react()],
  build: {
    outDir: "../dist", // wyjście do folderu "dist" obok "client"
    emptyOutDir: true, // czyści dist przy każdym buildzie
  },
  resolve: {
    alias: {
      "@": "/src", // możesz używać "@/..." w importach
    },
  },
});
