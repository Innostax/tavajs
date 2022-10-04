/* eslint-disable prettier/prettier */
module.exports = {
	env: {
		browser: true,
		es6: true,
		'jest/globals': true,
	},
	extends: ['plugin:react/recommended', 'standard', 'prettier'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 11,
		sourceType: 'module',
		allowImportExportEverywhere: true,
	},
	plugins: ['react', 'jest', 'react-hooks', 'prettier'],
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		'prettier/prettier': [
			'error',
			{
				printWidth: 80,
				trailingComma: 'es5',
				semi: false,
				jsxSingleQuote: true,
				singleQuote: true,
				useTabs: true,
				endOfLine: 'auto',
			},
		],
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 0,
		'react-hooks/exhaustive-deps': 'warn',
	},
}
