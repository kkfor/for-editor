import marked from 'marked'
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

// 段落解析
const paragraphParse = (text: string) => `<p>${text}</p>`

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
