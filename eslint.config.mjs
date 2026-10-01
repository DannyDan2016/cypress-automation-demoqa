import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import pluginCypress from 'eslint-plugin-cypress';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  {
    ignores: [
      'node_modules/',
      'reports/',
      'cypress/reports/',
      'cypress/screenshots/',
      'cypress/videos/',
      'cypress/downloads/',
    ],
  },
  js.configs.recommended,
  {
    files: ['cypress/**/*.js'],
    extends: [pluginCypress.configs.recommended],
    languageOptions: { globals: { ...globals.browser } },
    rules: {
      // Temporalmente en "warn": las esperas fijas se eliminan en la rama de refactor
      'cypress/no-unnecessary-waiting': 'warn',
      'cypress/no-force': 'warn',
      'cypress/no-pause': 'error',
      'cypress/no-debug': 'error',
      // "cypress/require-data-selectors" no aplica: DemoQA no expone atributos data-*
    },
  },
  {
    files: ['cypress.config.js'],
    languageOptions: { globals: globals.node, sourceType: 'commonjs' },
  },
  {
    files: ['eslint.config.mjs'],
    languageOptions: { globals: globals.node },
  },
  prettier,
]);
