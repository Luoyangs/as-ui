const cssLoaderConfig = require('./css-loader.config')
const config = require('../config')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: cssLoaderConfig.cssLoader({
    sourceMap: isProd ? config.build.productionSourceMap : config.dev.cssSourceMap,
    extract: isProd
  }),
  transformAssetUrls: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href',
    'inline-svg': 'src'
  }
}
