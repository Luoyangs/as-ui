// 覆盖默认的markdown-it fence渲染规则
module.exports = md => {
  const defaultRender = md.renderer.rules.fence

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const prevToken = tokens[idx - 1]
    // 判断该 fence 是否在 :::demo 内
    const isInDemoContainer = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^demo\s*(.*)$/)

    // info 三个反引号后面跟的那个字符串
    if (token.info === 'html' && isInDemoContainer) {
      return `<template slot="highlight">
                <pre v-pre>
                  <code class="html">${md.utils.escapeHtml(token.content)}</code>
                </pre>
              </template>`
    }

    return defaultRender(tokens, idx, options, env, self)
  }
}
