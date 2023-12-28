module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:svelte/recommended",
    "turbo"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["*.cjs"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    extraFileExtensions: [".svelte"]
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser"
      }
    }
  ],
  rules: {
    "linebreak-style": 0,
    "quotes": "off",
    "@typescript-eslint/quotes": [
      "error",
      "double"
    ],
    "comma-dangle": "off",
    "@typescript-eslint/comma-dangle": [
      "error",
      "always-multiline"
    ],
    "max-len": [
      "error",
      {
        "code": 130
      }
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": 1,
  }
};
