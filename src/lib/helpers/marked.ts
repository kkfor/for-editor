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
  highlight(code) {
    return Hljs.highlightAuto(code).value
  }
})

const renderer = new marked.Renderer()

// 段落解析
const paragraphParse = text => `<p>${text}</p>`

// 链接解析
const linkParse = (href, title, text) => {
  return `<a href=${href}
      title=${title || href}
      target='_blank'
      }>${text}</a>`
}

renderer.paragraph = paragraphParse
renderer.link = linkParse

export default content => {
  if (typeof content != 'string') return ''

  return marked(content, { renderer })
}
