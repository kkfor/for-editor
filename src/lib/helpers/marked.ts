import marked from 'marked'
import katex from 'katex'
import Hljs from './highlight'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight(code: string) {
    return Hljs.highlightAuto(code).value
  }
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

renderer.paragraph = paragraphParse
renderer.link = linkParse

export default (content: string) => {
  if (typeof content !== 'string') return ''

  return marked(content, { renderer })
}
