import js from '@eslint/js'
import css from '@eslint/css'
import globals from 'globals'
import eslintReact from '@eslint-react/eslint-plugin'
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
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      js,
      '@eslint-react': eslintReact,
      '@stylistic': stylistic,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...eslintReact.configs.strict.rules,
      ...stylistic.configs.recommended.rules,

      '@eslint-react/globals': 'error',
      '@eslint-react/immutability': 'error',
      '@eslint-react/dom-no-unknown-property': 'error',

      '@stylistic/padded-blocks': 'off',
      '@stylistic/multiline-ternary': 'off',
      '@stylistic/brace-style': ['error', '1tbs'],
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

      'css/use-baseline': ['error', { allowProperties: ['word-break'] }],
    },
  },

  {
    ignores: ['dist/'],
  },
]
