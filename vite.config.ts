import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // 1. Ustawiamy katalog główny aplikacji na 'client'.
  // To jest prawidłowe dla Twojej struktury.
  root: "client",

  // 2. Przywracamy poprawną definicję aliasów.
  // Ścieżka musi być absolutna, aby Vite ją znalazł.
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
    },
  },

  // 3. Ustawiamy katalog wyjściowy tak, aby pasował do Twojej komendy 'esbuild'.
  // Vite, działając z folderu 'client', musi wyjść jeden poziom wyżej ('../'),
  // a następnie wejść do 'dist/public'.
  build: {
    outDir: "../dist/public",
    emptyOutDir: true,
  },
});
