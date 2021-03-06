module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['airbnb-typescript/base', 'plugin:import/recommended'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: 'tsconfig.eslint.json',
      },
    },
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    'max-len': ['error', { code: 123 }],
    'prefer-template': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
  },
  ignorePatterns: ['lib/*', 'node_modules/*'],
};

// prettier configuration has been added in the following commit - 8fa774c675edb0a44671027866aebd422bbb816f
