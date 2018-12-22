import React from 'react'
import './index.scss'
import classNames from 'classnames'
import marked from '../helpers/marked'
import 'highlight.js/styles/tomorrow.css'

class MdEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      preview: false
    }
  }

  editorChangeHandle(e) {
    this.setState({
      content: e.target.value
    })
  }

  insert(insertValue) {
    // const textarea = this.refs.forTextarea
    // const value = textarea.value
    // if (textarea.selectionStart || textarea.selectionStart === 0) {
    //   let start = textarea.selectionStart
    //   let end = textarea.selectionEnd
    //   textarea.value =
    //     value.substring(0, start) +
    //     insertValue +
    //     value.substring(end, value.length)
    //   textarea.focus()
    //   textarea.selectionStart = start + insertValue.length
    //   textarea.selectionEnd = end + insertValue.length
    // }
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
            <li onClick={this.insert.bind(this, '![]()')}>图片</li>
            <li onClick={this.insert.bind(this, '[]()')}>链接</li>
            <li onClick={this.insert.bind(this, '```\n\n```')}>&lt;&gt;</li>
            <li onClick={this.insert.bind(this, '``')}>&lt;</li>
          </ul>
          <ul>
            <li className={previewActive} onClick={this.preview.bind(this)}>
              预览
            </li>
          </ul>
        </div>
        <div className="for-editor">
          <div className={editorClass}>
            <textarea
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
