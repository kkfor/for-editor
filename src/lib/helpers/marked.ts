import marked from 'marked'
import katex from 'katex'
import Hljs from './highlight'
import mermaided from './mermaided'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

const renderer = new marked.Renderer()

// latex解析
const latexParse = (latex: string) => {
  let html: string = katex.renderToString(latex, {
    displayMode: true,
    leqno: false,
    fleqn: false,
    throwOnError: false,
    strict: 'warn',
    trust: false,
    output: 'html'
  })
  return html
}

// 段落解析
const paragraphParse = (text: string) => {
  if (text.substr(0, 2) === '$$' && text.substr(-2, 2) === '$$') {
    let len: number = text.length - 4
    let latex: string = String.raw`${text.substr(2, len)}`
    return latexParse(latex)
  } else {
    return `<p>${text}</p>`
  }
}

// 链接解析
const linkParse = (href: string, title: string, text: string) => {
  return `<a href=${href}
      title=${title || href}
      target='_blank'
      }>${text}</a>`
}

const codeParse = (code: string, language: string) => {
  if (language === 'mermaid') {
    let cleanFlag = code
      .replace(/[\r\n]/g, '')
      .split(' ')[0]
      .split('\n')[0]
    if (code.length === 0) return ''
    else if (
      cleanFlag === 'graph' ||
      cleanFlag === 'sequenceDiagram' ||
      cleanFlag === 'classDiagram' ||
      cleanFlag === 'stateDiagram' ||
      cleanFlag === 'gantt' ||
      cleanFlag === 'pie'
    ) {
      // let test: Array<String> = []
      // test.push(code)
      // // eslint-disable-next-line no-console
      // console.log(test)
      return mermaided(code)
    } else {
      return `<p>${code}</p>`
    }
  } else {
    return `<pre><code class=language-${language}>${Hljs.highlightAuto(code).value}</code></pre>`
  }
}

renderer.code = codeParse
renderer.paragraph = paragraphParse
renderer.link = linkParse

export default (content: string) => {
  if (typeof content !== 'string') return ''

  return marked(content, { renderer })
}
