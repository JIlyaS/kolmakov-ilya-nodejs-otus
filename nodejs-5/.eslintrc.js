module.exports = {
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    extends: ['airbnb'],
    plugins: [
        'prettier',
    ],
    parser: '@babel/eslint-parser',
    parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        'linebreak-style': 'off',

        'arrow-parens': 'off',
        'object-curly-newline': 'off',
        'no-mixed-operators': 'off',
        'arrow-body-style': 'off',
        'function-paren-newline': 'off',
        'no-plusplus': 'off',
        'space-before-function-paren': 0,

        'max-len': ['error', 100, 2, { ignoreUrls: true, }],
        'no-alert': 'error',

        'no-param-reassign': 'off',
        "radix": "off",

        'prefer-destructuring': 'off',

        'prettier/prettier': ['error'],
    },
};