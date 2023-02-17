/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
    "./.eslintrc-auto-import.json",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "vue/multi-word-component-names": "off",
    "no-console": "error",
    "no-debugger": "error",
    "no-unused-components": "off",
    "no-unused-vars": "off",
    "no-empty-function": "off",
    "prefer-const": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-undef": "off",
  },
};
