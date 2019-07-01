// Plugin for creating block - level custom containers for markdown - it markdown parser.
const mdContainer = require('markdown-it-container')

module.exports = md => {
  md.use(mdContainer, 'demo', {
    // 当我们写:::demo :::这样的语法时才会进入自定义渲染方法
    validate(params) {
      // 表示检测以"::: demo"开始的都符合条件
      return params.trim().match(/^demo\s*(.*)$/)
    },
    // renderer function for opening / closing tokens.
    render(tokens, idx) {
      // info 三个反引号后面跟的那个字符串
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)

      // nesting 属性：
      //  1 意味着标签打开。
      //  0 意味着标签是自动关闭的。
      //  -1 意味着标签正在关闭。
      if (tokens[idx].nesting === 1) {
        // m[1]表示/^demo\s*(.*)$/括号匹配的内容
        const desc = m && m.length ? m[1] : ''
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''

        return `<demo-block>
                  ${desc ? `<div>${md.render(desc)}</div>` : ''}
                  <!--as-ui-demo: ${content}:as-ui-demo-->`
      }

      return '</demo-block>'
    }
  })

  md.use(mdContainer, 'tip')
  md.use(mdContainer, 'warning')
}
