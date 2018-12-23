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
      preview: false
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

  insert(insertValue) {
    const editorNode = this.state.editorNode
    const value = editorNode.value
    if (editorNode.selectionStart || editorNode.selectionStart === 0) {
      let start = editorNode.selectionStart
      let end = editorNode.selectionEnd
      editorNode.value =
        value.substring(0, start) +
        insertValue +
        value.substring(end, value.length)
      editorNode.focus()
      editorNode.selectionStart = start + insertValue.length
      editorNode.selectionEnd = end + insertValue.length
    }
  }

  preview() {
    this.setState({
      preview: !this.state.preview
    })
  }

  render() {
    const { preview } = this.state
    const previewClass = classNames({
      'for-panel': true,
      'for-preview-hidden': !preview
    })
    const editorClass = classNames({
      'for-panel': true
    })
    const previewActive = classNames({
      active: preview
    })

    const { value } = this.props
    return (
      <div className="for-container">
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
              onChange={this.props.onChange}
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
