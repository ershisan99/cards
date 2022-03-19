module.exports = {
    env: {
        browser: true,
        node: true,
        amd: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'react/prop-types': 'off',
        'react/display-name': 'off',
        'react/react-in-jsx-scope': 'off',
        'no-empty-pattern': 'off',
        'no-debugger': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}
