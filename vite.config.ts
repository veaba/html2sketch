/// <reference types="vitest" />
/// <reference types="vite-svg-loader" />
/// <reference types="vite/client" />

import { defineConfig } from "vitest/config";
import { resolve } from 'path'
// import solid from 'vite-plugin-solid'
import svgLoader from 'vite-svg-loader'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    // solid(),
    svgLoader()
  ],
  assetsInclude:['**/*.html'],
  resolve: {
    alias: {
      '@html2sketch': resolve(__dirname, './src'),
      '@test-utils': resolve(__dirname, './test/__utils__/'),
      '@docs-utils': resolve(__dirname, './docs/__utils__'),
      '@e2e-utils': resolve(__dirname, './e2e/__utils__'),
      /** 测试环境下，do_objectID 使用的 UUID 是 类似 BA0CE274-426F-4E90-8F57-2A5FF3A81C0F 的字符
       * 所以期望在 测试环境下替换掉
       * 类似 jest moduleNameMapper {
       *  uuid: '<rootDir>/test/__mocks__/uuid.ts',
       * }
       * */
      'UUID':resolve(__dirname, './test/__mocks__/uuid.ts'),
    }
  },
  define:{
    IS_TEST_ENV: true,
    __ROOT__: JSON.stringify(__dirname),
    __TESTS__: JSON.stringify(resolve(__dirname, './test/__tests__')),
  },
  test: {
    globals: true,
    browser: {
      enabled: true,
      name: 'chrome',
      headless: false,
      provider: process.env.PROVIDER || 'webdriverio',
    },
    transformMode: {
      web: [/.[jt]sx?/],
    },
  }
});
