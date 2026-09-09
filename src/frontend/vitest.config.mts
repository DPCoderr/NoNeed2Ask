import react from "@vitejs/plugin-react"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "server-only": fileURLToPath(
        new URL("./node_modules/next/dist/compiled/server-only/empty.js", import.meta.url)
      ),
    },
    tsconfigPaths: true,
  },
  test: {
    clearMocks: true,
    environment: "jsdom",
    maxWorkers: 1,
    setupFiles: ["./tests/setup.ts"],
  },
})
