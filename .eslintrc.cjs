module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'react-compiler'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'react/prop-types': 'off',
    'prettier/prettier': 'error',
    'react-compiler/react-compiler': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
