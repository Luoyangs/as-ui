module.exports = {
  build: {
    assetsRoot: 'libs',
    assetsSubDirectory: '',
    productionSourceMap: true,

    // use `npm run build --report` to view bundle analyzer report after build finished
    bundleAnalyzerReport: process.env.npm_config_report || process.argv.includes('--report')
  },
  dev: {
    port: 8001,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: true
  }
}
