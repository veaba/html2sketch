const config = require('@umijs/max/eslint');

module.exports = {
  globals: {
    page: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  ...config,
  rules: {
    ...config.rules,
    'no-param-reassign': 0,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@html2sketch', './src/'],
          ['@html2sketch/*', './src/*'],
          ['@docs-utils', './docs/__utils__'],
          ['@e2e-utils', './e2e/__utils__'],
          ['@test-utils', './tests/__utils__'],
        ],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
