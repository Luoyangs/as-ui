module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'semi': 0,
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'semi': [2, 'never']
      }
    }
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
