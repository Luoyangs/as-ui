module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-syntax-import-meta'
  ],
  env: {
    production: {
      presets: [
        [
          '@vue/app',
          {
            'target': {
              node: true
            }
          }
        ]
      ],
      plugins: [
        [
          'component',
          {
            libraryName: 'as-ui'
          },
          'as-ui'
        ]
      ]
    }
  }
}
