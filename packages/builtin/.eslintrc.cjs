module.exports = {
	extends: ["@repo/eslint-config/index.js"],
	parserOptions: {
		project: "./tsconfig.json"
	},
	rules: {
		"import/extensions": 0,
		"import/no-extraneous-dependencies": 0,
		"import/no-unresolved": 0,
		"import/prefer-default-export": 0,
		"dot-notation": "off",
		"@typescript-eslint/dot-notation": 0,
		"padded-blocks": 0,
		"lines-between-class-members": "off",
		"@typescript-eslint/lines-between-class-members": [
			"error",
			"always",
			{
				"exceptAfterSingleLine": true
			}
		],
		"@typescript-eslint/naming-convention": [
			"error",
			{
				"selector": "variable",
				"format": ["camelCase", "UPPER_CASE", "snake_case"],
			}
		],
		"object-shorthand": 0,
		"object-curly-newline": 0,
		"no-useless-return": 0,
		"no-case-declarations": 0,
		"no-debugger": 0,
		"no-plusplus": 0,
		"no-tabs": ["error", { allowIndentationTabs: true }]
	}
};
