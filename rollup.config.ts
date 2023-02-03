import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'

export default defineConfig({
  input: "src/index.ts",
  output: {
    file: `dist/esm-bundler.js`,
    format: `es`
  },
  plugins: [
    nodeResolve({
      preferBuiltins: true,
    }),
    json(),
    commonjs(),
    esbuild({
      target: 'node14'
    })
  ],
})