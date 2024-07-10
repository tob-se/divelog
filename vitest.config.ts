import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["**/*.test.?(c|m)[jt]s?(x)"],
    environment: "jsdom",
    setupFiles: ["test.setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
