module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:jest/recommended', 'plugin:prettier/recommended'],
  plugins: ['react', '@typescript-eslint'],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    quotes: ['error', 'single'],
    semi: [2, 'never'],
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'import/prefer-default-export': 0,
    'no-multi-spaces': 'warn',
    'no-console': 'warn',
    camelcase: 0,
    'class-methods-use-this': 0,
    'react/no-array-index-key': 0,
    'react/prop-types': 0,
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: false,
      },
    ],
    'arrow-body-style': 0,
    'max-len': [
      'error',
      {
        code: 120,
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
  },
}
