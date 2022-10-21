module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  rules: {
    'prettier/prettier': 'error',
    "@typescript-eslint/strict-boolean-expressions": 0
  },
  plugins: ['prettier'],
  extends: ['standard-with-typescript', 'plugin:prettier/recommended'],
  ignorePatterns: ['*.js', '*.d.ts'],
};
