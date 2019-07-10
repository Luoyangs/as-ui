const path = require('path')
const opn = require('opn')
const express = require('express')
const webpack = require('webpack')
const httpProxyMiddleware = require('http-proxy-middleware')
const config = require('./config')
const webpackDevConfig = require('./webpack.dev.config')

const port = config.dev.port
const proxyTable = config.dev.proxyTable || {}

const app = express()
const compiler = webpack(webpackDevConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackDevConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  heartbeat: 2000,
  log: false
})

compiler.hooks.compilation.tap('HtmlWebpackPlugin', function(compilation) {
  compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync('HtmlWebpackPlugin', function(data, cb) {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
})

Object.keys(proxyTable).forEach(function(context) {
  let option = proxyTable[constex]

  if (typeof option === 'string') {
    option = {
      target: option
    }
  }

  app.use(httpProxyMiddleware(option.filter || context, option))
})

app.use(require('connect-history-api-fallback')({
  index: '/static/index.html'
}))

app.use(devMiddleware)
app.use(hotMiddleware)

// static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('static'))

app.get('/static/*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../static' + req.path))
})

const uri = `http://localhost:${port}`
let _resolve

const readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('Listening at ' + uri)

  opn(uri)
  _resolve()
})

const server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
