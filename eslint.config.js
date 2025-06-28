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

export default defineConfig([
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    ignores: [
      "**/*.css",
      "**/*.module.css",
      "**/node_modules/**",
      "**/.next/**",
      "eslint.config.js", // Garante que não tente parsear esse próprio arquivo
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser, // ✅ Suporte para TypeScript e JSX
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json", // ✅ Caminho explícito correto
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
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
  },

  // JSON
  {
    files: ["**/*.json"],
    plugins: {
      json,
    },
    rules: {
      ...json.configs.recommended.rules,
    },
  },

  // JSONC
  {
    files: ["**/*.jsonc"],
    plugins: {
      json,
    },
    rules: {
      ...json.configs.recommended.rules,
    },
  },

  // JSON5
  {
    files: ["**/*.json5"],
    plugins: {
      json,
    },
    rules: {
      ...json.configs.recommended.rules,
    },
  },

  // Markdown
  {
    files: ["**/*.md"],
    plugins: {
      markdown,
    },
    rules: {
      ...markdown.configs.recommended.rules,
    },
  },

  // CSS
  {
    files: ["**/*.css"],
    plugins: {
      css,
    },
    rules: {
      ...css.configs.recommended.rules,
    },
  },
]);
