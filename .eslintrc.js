module.exports = {
    globals: {
        process: true,
    },
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {},
};
