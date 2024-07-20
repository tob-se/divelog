import path from "path";
import { defineWorkspace } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineWorkspace([
  {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    test: {
      include: ["infrastructure/**/*.test.?(c|m)[jt]s?(x)"],
      name: "unit",
      environment: "node",
      setupFiles: ["test.setup.ts"],
      isolate: false,
    },
  },
  {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    test: {
      include: ["app/**/*.test.?(c|m)[jt]s?(x)"],
      name: "browser",
      browser: {
        enabled: true,
        provider: "playwright",
        name: "chromium",
      },
    },
  },
]);
