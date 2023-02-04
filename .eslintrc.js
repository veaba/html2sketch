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
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/default': 0,
    'import/no-named-as-default-member': 0,
    'import/named': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'no-restricted-globals': 0,
    'no-continue': 0,
    'no-shadow': 'warn',
    'no-console': 0,
    'no-underscore-dangle': 0,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@html2sketch', './src/'],
          ['@html2sketch/*', './src/*'],
          ['@docs-utils', './docs/__utils__'],
          ['@e2e-utils', './e2e/__utils__'],
          ['@test-utils', './test/__utils__'],
        ],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
