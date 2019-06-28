const { compileTemplate } = require('@vue/component-compiler-utils')
const compiler = require('vue-template-compiler')

function stripScript(content) {
  const result = content.match(/<(script)\s*[lang="ts"]*>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

function stripStyle(content) {
  const result = content.match(/<(style)\s*[lang="scss"]\s*[scoped]>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

function stripTemplate(content) {
  content = content.trim()

  if (!content) {
    return content
  }

  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim()
}

function pad(source) {
  return source.split(/\r?\n/).map(line => `  ${line}`).join('\n')
}

function genInlineComponentText(template, script) {
  const finalOptions = {
    source: `<div>${template}</div>`,
    filename: 'inline-component',
    compiler
  }

  const compiled = compileTemplate(finalOptions)

  // tips
  if (compiled.tips && compiled.tips.length) {
    compiled.tips.forEach(tip => {
      console.warn(tip)
    })
  }

  // errors
  if (compiled.errors && compiled.errors.length) {
    console.error(
      `\n  Error compiling template:\n${pad(compiled.source)}\n` +
      compiled.errors.map(e => `  - ${e}`).join('\n') +
      '\n'
    )
  }

  let demoComponentContent = `${compiled.code}`
  script = script.trim()

  if (script) {
    script = script.replace(/export\s+default/, 'const demoComponentExport = ')
  } else {
    script = 'const demoComponentExport = {}'
  }

  demoComponentContent = `(function() {
    ${demoComponentContent}
    ${script}

    return {
      render,
      staticRenderFns,
      ...demoComponentExport
    }
  })()`

  return demoComponentContent
}

module.exports = {
  stripTemplate,
  stripScript,
  stripStyle,
  genInlineComponentText
}
