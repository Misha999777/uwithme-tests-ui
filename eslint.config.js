import js from '@eslint/js'
import css from '@eslint/css'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import stylistic from '@stylistic/eslint-plugin'

export default [
  {
    files: ['**/*.{js,jsx}'],

    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    plugins: {
      js,
      react,
      'react-hooks': reactHooks,
      '@stylistic': stylistic,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...stylistic.configs.recommended.rules,

      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-tag-spacing': ['error', {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      }],
      'react/jsx-max-props-per-line': ['error', {
        maximum: 3,
      }],
      '@stylistic/padded-blocks': 'off',
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/multiline-ternary': ['error', 'always-multiline', {
        ignoreJSX: true,
      }],
    },
  },

  {
    files: ['**/*.css'],
    language: 'css/css',

    plugins: {
      css,
    },

    rules: {
      ...css.configs.recommended.rules,
    },
  },

  {
    ignores: ['dist/'],
  },
]
