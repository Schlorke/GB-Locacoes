// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import parser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";

export default defineConfig({
  ignores: [
    "**/*.css",
    "**/*.module.css",
    "**/node_modules/**",
    "**/.next/**",
    "eslint.config.js",
  ],

  files: ["**/*.{js,ts,jsx,tsx}"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser,
    parserOptions: {
      ecmaFeatures: { jsx: true },
      project: "./tsconfig.json",
      tsconfigRootDir: process.cwd(),
    },
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  plugins: {
    react,
    json,
    markdown,
    css,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    ...js.configs.recommended.rules,
    ...tseslint.configs.recommended[0].rules,
    "react/display-name": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }],
    "no-undef": "error",
  },
});
