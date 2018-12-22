const Hljs = require('highlight.js/lib/highlight')

Hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
Hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
Hljs.registerLanguage('less', require('highlight.js/lib/languages/less'))
Hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
Hljs.registerLanguage(
  'javascript',
  require('highlight.js/lib/languages/javascript')
)
Hljs.registerLanguage(
  'typescript',
  require('highlight.js/lib/languages/typescript')
)

export default Hljs
