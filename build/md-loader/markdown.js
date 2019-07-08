const MarkdownItChain = require('markdown-it-chain')
const markdownItAnchor = require('markdown-it-anchor')
const slugify = require('transliteration').slugify
const container = require('./container')
const fence = require('./fence')

const chain = new MarkdownItChain()

chain
  .options.html(true).end()
  // 添加导航锚点
  .plugin('anchor').use(markdownItAnchor, [
    {
      level: 2,
      slugify,
      permalink: true,
      permalinkBefore: false,
      permalinkSymbol: '#'
    }
  ]).end()
  // 添加内容
  .plugin('containers').use(container).end()

const markdown = chain.toMd()
fence(markdown)

module.exports = markdown
