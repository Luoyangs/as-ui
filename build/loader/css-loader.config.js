const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.cssLoader = function(options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  function genLoaders(loader, loaderOption) {
    const loaders = [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOption, {
          sourceMap: options.sourceMap
        })
      })
    }

    if (options.extract) {
      return [MiniCssExtractPlugin.loader].concat(loaders)
    }

    return ['vue-style-loader'].concat(loaders)
  }

  return {
    css: genLoaders(),
    less: genLoaders('less'),
    sass: genLoaders('sass', { indentedSyntax: true }),
    scss: genLoaders('sass'),
    stylus: genLoaders('stylus'),
    styl: genLoaders('stylus')
  }
}

exports.styleLoaders = function(options) {
  const output = []
  const loaders = exports.cssLoader(options)

  for (const key in loaders) {
    const loader = loaders[key]
    output.push({
      test: new RegExp('\\.' + key + '$'),
      use: loader
    })
  }

  return output
}
