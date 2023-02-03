import { defineConfig } from "vitest/config";
import { resolve } from 'path'
export default defineConfig({
  test: {
    // ...
  },
  resolve: {
    alias: {
      '@docs-utils': resolve(__dirname, 'src/index.ts'),
    },
  }
});