import React from 'react'
import './index.scss'
import classNames from 'classnames'
import marked from '../helpers/marked'
import 'highlight.js/styles/tomorrow.css'
import '../fonts/iconfont.css'

class MdEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editorNode: null,
      preview: false,
      expand: false
    }
  }

  editorChangeHandle(e) {
    this.setState({
      content: e.target.value
    })
  }

  handleEditorNode = editorNode => {
    this.setState({
      editorNode
    })
  }

  handleChange(e) {
    this.props.onChange(e.target.value)
  }

  insert(insertValue) {
    const editorNode = this.state.editorNode
    const value = editorNode.value
    if (editorNode.selectionStart || editorNode.selectionStart === 0) {
      let start = editorNode.selectionStart
      let end = editorNode.selectionEnd

      const restoreTop = editorNode.scrollTop

      editorNode.value =
        value.substring(0, start) +
        insertValue +
        value.substring(end, value.length)
      editorNode.focus()
      if (restoreTop >= 0) {
        editorNode.scrollTop = restoreTop
      }
      editorNode.selectionStart = start + insertValue.length
      editorNode.selectionEnd = end + insertValue.length
    }
  }

  preview() {
    this.setState({
      preview: !this.state.preview
    })
  }
  expand() {
    this.setState({
      expand: !this.state.expand
    })
  }

  render() {
    const { preview, expand } = this.state
    const previewClass = classNames({
      'for-panel': true,
      'for-preview-hidden': !preview
    })
    const editorClass = classNames({
      'for-panel': true
    })
    const previewActive = classNames({
      'for-active': preview
    })
    const fullscreen = classNames({
      'for-container': true,
      'for-fullscreen': expand
    })
    const expandActive = classNames({
      'for-active': expand
    })

    const { value } = this.props
    return (
      <div className={fullscreen}>
        <div className="for-controlbar">
          <ul>
            {/* <li onClick={this.undo.bind(this, '### ')}>撤销</li> */}
            <li onClick={this.insert.bind(this, '# ')}>H1</li>
            <li onClick={this.insert.bind(this, '## ')}>H2</li>
            <li onClick={this.insert.bind(this, '### ')}>H3</li>
            <li onClick={this.insert.bind(this, '#### ')}>H4</li>
            <li onClick={this.insert.bind(this, '![]()')}>
              <i className="foricon for-image" />
            </li>
            <li onClick={this.insert.bind(this, '[]()')}>
              <i className="foricon for-link" />
            </li>
            <li onClick={this.insert.bind(this, '```\n\n```')}>
              <i className="foricon for-code" />
            </li>
          </ul>
          <ul>
            <li className={expandActive} onClick={this.expand.bind(this)}>
              <i className="foricon for-expand" />
            </li>
            <li className={previewActive} onClick={this.preview.bind(this)}>
              <i className="foricon for-eye" />
            </li>
          </ul>
        </div>
        <div className="for-editor">
          <div className={editorClass}>
            <textarea
              ref={this.handleEditorNode}
              value={value}
              onChange={this.handleChange.bind(this)}
              placeholder="请输入内容..."
            />
          </div>
          <div className={previewClass}>
            <div
              className="for-preview for-markdown-preview"
              dangerouslySetInnerHTML={{ __html: marked(value) }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default MdEditor
