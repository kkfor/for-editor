import React from 'react'
import getEditorTools from '../../config/tools'

interface IP {
  tools: any
  language: any
  editor: any
}

interface IS {}

export default class Toolbars extends React.Component<IP, IS> {
  static defaultProps = {}

  constructor(props: IP) {
    super(props)
  }

  applyTool(command) {}

  render() {
    const { editor, tools, language } = this.props

    const editorTools = getEditorTools(language, editor)
    const rightPropsTools = ['preview', 'expand', 'subfield']
    const leftTools = tools.filter((item) => rightPropsTools.indexOf(item) === -1)
    const rightTools = tools.filter((item) => rightPropsTools.indexOf(item) > -1)

    const iRender = (list) => {
      return list.map((item, index) => {
        let toolItem = editorTools.find(
          (subItem) => subItem.key.toLowerCase() === item.toLowerCase()
        )
        if (!toolItem) return null
        if (toolItem) {
          return (
            <li key={index} title={toolItem.title} onClick={() => this.applyTool(toolItem.command)}>
              {toolItem.text}
            </li>
          )
        }
      })
    }

    return (
      <div className="for-toolbar">
        <ul>{iRender(leftTools)}</ul>
        <ul>{iRender(rightTools)}</ul>
      </div>
    )
  }
}
