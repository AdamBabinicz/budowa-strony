import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Definiowanie __dirname w środowisku ES Modules
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],

  // Twoja poprawna konfiguracja aliasów
  resolve: {
    alias: {
      "@": resolve(__dirname, "client", "src"),
      "@shared": resolve(__dirname, "shared"),
    },
  },

  // Twoja poprawna definicja folderu root
  root: resolve(__dirname, "client"),

  // Twoja poprawna konfiguracja budowania
  build: {
    outDir: resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },

  // Twoja poprawna konfiguracja serwera
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },

  // --- KLUCZOWY DODATEK: Konfiguracja dla Vitest ---
  test: {
    globals: true,
    environment: "jsdom",
    // Ścieżka do pliku setup jest względna do GŁÓWNEGO folderu projektu,
    // a nie do folderu `root` zdefiniowanego powyżej.
    // Zakładając, że plik jest w `client/src/setupTests.ts`:
    setupFiles: "./client/src/setupTests.ts",
  },
});
