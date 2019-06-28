const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
const FriendlyErrorPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.config')
const config = require('./config')
const cssLoaderConfig = require('./loader/css-loader.config')

const { resolve } = require('./utils')

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  entry: ['./examples/main.ts', './build/dev-client.js'],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, `../${config.dev.assetsSubDirectory}`),
    publicPath: `/${config.dev.assetsSubDirectory}`
  },
  devtool: '#cheap-eval-source-map',
  module: {
    rules: [
      ...cssLoaderConfig.styleLoaders({
        sourceMap: config.dev.cssSourceMap
      }),
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js')
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new OptimizeCssPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve('examples/index.html')
    }),
    new FriendlyErrorPlugin()
  ]
})
