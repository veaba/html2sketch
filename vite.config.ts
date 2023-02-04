import { defineConfig } from "vitest/config";
import { resolve } from 'path'
export default defineConfig({
  resolve: {
    alias: {
      '@html2sketch': resolve(__dirname, './src'),
      '@test-utils': resolve(__dirname, './test/__utils__/'),
      '@docs-utils': resolve(__dirname, './docs/__utils__'),
      '@e2e-utils': resolve(__dirname, './e2e/__utils__'),
    }
  },
  test: {
    environment: "happy-dom",
    setupFiles: 'vitest.setup.ts',
    deps: {
      inline: ['vitest-canvas-mock'],
    },
    // For this config, check https://github.com/vitest-dev/vitest/issues/740
    threads: false,
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
  }
});
