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
        project: './tsconfig.json',
      },
    },
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': [
      'error',
      {
        ignoreRestArgs: true,
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  ignorePatterns: ['lib/*'],
};

// prettier configuration has been added in the following commit - 8fa774c675edb0a44671027866aebd422bbb816f