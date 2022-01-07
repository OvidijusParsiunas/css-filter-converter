module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['airbnb-typescript/base'],
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
    '@typescript-eslint/no-explicit-any': process.env.NODE_ENV === 'production' ? ['error', {
      'ignoreRestArgs': true
    }] : ['error', {
      'ignoreRestArgs': false
    }],
  },
  ignorePatterns: ['lib/*']
}
