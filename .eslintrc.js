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
	},
	overrides: [{
		files: [
			"**/*.test.js",
			"__tests__/modules/setup.js",
			"__tests__/modules/afterAll.js",
		],
		env: {
			jest: true // now **/*.test.js files' env has both es6 *and* jest
		},
		// Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
		// "extends": ["plugin:jest/recommended"]
		plugins: ["jest"],
		rules: {
			"jest/no-disabled-tests": "warn",
			"jest/no-focused-tests": "error",
			"jest/no-identical-title": "error",
			"jest/prefer-to-have-length": "warn",
			"jest/valid-expect": "error"
		}
	}],
};