const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VueLoaderConfig = require('./loader/vue-loader.config')
const { resolve, assetsPath } = require('./utils')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const packageName = require('../package.json').name

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: VueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('examples'), resolve('packages')]
      },
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsxSuffixTo: [/\.vue$/]
            }
          }
        ],
        include: [resolve('src'), resolve('examples'), resolve('packages')],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: assetsPath('images/[name].[ext]'),
          publicPath: process.env.NODE_ENV === 'production' ? 'libs/' : ''
        }
      },
      {
        test: /\.nosvgo\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /^((?!\.nosvgo.))*svg$/,
        use: [
          {
            loader: 'svg-inline-loader'
          },
          {
            loader: 'svgo-loader',
            options: {
              externalConfig: resolve('svgo.yml')
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', 'tsx', '.vue', 'json'],
    alias: {
      vue: 'vue/dist/vue.common.js',
      [packageName]: resolve('packages'),
      '@public': resolve('public'),
      '@src': resolve('src')
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({
      vue: true,
      tslint: true
    })
  ]
}
