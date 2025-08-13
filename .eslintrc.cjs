/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'next/typescript', 'plugin:storybook/recommended'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    'storybook/no-renderer-packages': 'off',
  },
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'dist/',
    'build/',
    'storybook-static/',
    '**/*.config.js',
    '**/*.config.cjs',
    '**/*.config.mjs',
    'scripts/',
    'eslint.config.js',
    '!.storybook',
  ],
}
