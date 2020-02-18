import * as React from 'react'
import mermaid from 'mermaid'

interface IP {
  name?: string
  code: string
}

// 这个地方调用钩子报错
function mermaided(props: IP) {
  const [diagram, setDiagram] = React.useState('Loading diagram...')
  const name = 'mermaid' || props.name
  React.useEffect(() => {
    mermaid.mermaidAPI.render(name, props.code, (html) => setDiagram(html))
  }, [])
  return <div className="mermaid" dangerouslySetInnerHTML={{ __html: diagram }}></div>
}

export default (code: string) => {
  return mermaided({code: code})
}
