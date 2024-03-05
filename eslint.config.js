import eslintConfigPrettier from 'eslint-config-prettier';
export default [
  {
    files: ['src/**/*.js'],
    ignores: ['**/*.config.js', '!**/eslint.config.js'],
    rules: {
      semi: 'error',
    },
  },
  eslintConfigPrettier,
];

/* module.exports = {
  globals: {
    process: true,
    __dirname: 'readonly',
  },
  env: {
    browser: true,
    commonjs: false,
    es2021: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {},
}; */
