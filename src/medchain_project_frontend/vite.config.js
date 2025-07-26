import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import environment from "vite-plugin-environment";
import dotenv from "dotenv";
import nodePolyfills from "rollup-plugin-polyfill-node";

dotenv.config({ path: "../../.env" });

export default defineConfig({
  build: {
    emptyOutDir: true,
    rollupOptions: {
      plugins: [nodePolyfills()],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
    include: ["buffer", "process", "stream"],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), environment("all", { prefix: "CANISTER_" }), environment("all", { prefix: "DFX_" })],
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(new URL("../declarations", import.meta.url)),
      },
      {
        find: "stream",
        replacement: "stream-browserify",
      },
      {
        find: "buffer",
        replacement: "buffer",
      },
      {
        find: "util",
        replacement: "util",
      },
      {
        find: "process",
        replacement: "process/browser",
      },
    ],
    dedupe: ["@dfinity/agent"],
  },
  define: {
    global: "globalThis",
  },
});
