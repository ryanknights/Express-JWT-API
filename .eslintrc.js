module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "airbnb-base",
        "plugin:node/recommended",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'import/no-cycle': 'off',
        "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
        "no-underscore-dangle": 'off',
        "no-param-reassign": [2, {
            "props": false
        }]
    }
};