const path = require('path')
const uppercamelcase = require('uppercamelcase')
const config = require('../config')

exports.resolve = function(dir) {
  return path.join(__dirname, '../..', dir)
}

exports.assetsPath = function(dir) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, dir)
}

exports.lowerhyphenate = function(str) {
  return str.replace(/([A-Z])/g, '-$1').replace(/(\/|^)-/, $1).toLowerCase()
}

exports.uppercamelcase = uppercamelcase
