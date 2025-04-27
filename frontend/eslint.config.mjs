import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  stylistic.configs.recommended,
  { files: ['**/*.{js,mjs,cjs,jsx}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,jsx}'], languageOptions: { globals: globals.browser } },
  { ignores: [
    '**/node_modules/**',
    'dist/**',
  ] },
  pluginReact.configs.flat.recommended,
  { languageOptions: { globals: { ...globals.browser, React: 'readonly' } } },
  { settings: { react: { version: 'detect' } } },
  { rules: { 'react/prop-types': 'off' } },
])
