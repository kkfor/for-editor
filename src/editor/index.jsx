import React from 'react'
import './index.scss'
import classNames from 'classnames'
import marked from '../helpers/marked'
import textInsert from '../helpers/textInsert'
import 'highlight.js/styles/tomorrow.css'
import '../fonts/iconfont.css'

class MdEditor extends React.Component {
  constructor(props) {
    super(props)

    this.$vm = null
    this.handleEditorRef = $vm => {
      this.$vm = $vm
    }

    this.state = {
      preview: false,
      expand: false,
      f_history: [],
      f_history_index: 0,
      line_index: 1
    }
  }

  static defaultProps = {
    placeholder: '请输入内容...'
  }

  componentDidMount() {
    // 编辑框回显
    this.saveHistory(this.$vm.value)
  }

  // 输入框改变
  handleChange(e) {
    const value = e.target.value
    this.saveHistory(value)
  }

  // 快捷插入
  insert(e) {
    const { $vm } = this
    const type = e.currentTarget.getAttribute('data-type')
    textInsert($vm, type)
    this.saveHistory($vm.value)
  }

  // 保存记录
  saveHistory(value) {
    let { f_history, f_history_index } = this.state
    window.clearTimeout(this.currentTimeout)
    this.currentTimeout = setTimeout(() => {
      // 撤销后修改，删除当前以后记录
      if (f_history_index < f_history.length - 1) {
        f_history.splice(f_history_index + 1)
      }
      // 超出记录最多保存数后，滚动储存
      if (f_history.length >= 20) {
        f_history.shift()
      }
      // 记录当前位置
      f_history_index = f_history.length
      f_history.push(value)
      this.setState({
        f_history,
        f_history_index
      })
    }, 500)
    // 将值传递给父组件
    this.props.onChange(value)
    this.handleLineIndex(value)
  }

  handleLineIndex(value) {
    const line_index = value.split('\n').length
    this.setState({
      line_index
    })
  }

  undo() {
    const { f_history } = this.state
    let { f_history_index } = this.state
    f_history_index = f_history_index - 1
    if (f_history_index < 0) return
    this.setState({
      f_history_index
    })
    const value = f_history[f_history_index]
    // 将值传递给父组件
    this.props.onChange(value)
  }

  redo() {
    const { f_history } = this.state
    let { f_history_index } = this.state
    f_history_index = f_history_index + 1
    if (f_history_index >= f_history.length) return
    this.setState({
      f_history_index
    })
    const value = f_history[f_history_index]
    // 将值传递给父组件
    this.props.onChange(value)
  }

  // 预览
  preview() {
    this.setState({
      preview: !this.state.preview
    })
  }

  // 全屏
  expand() {
    this.setState({
      expand: !this.state.expand
    })
  }

  render() {
    const { preview, expand, line_index } = this.state
    const { value } = this.props
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

    const lineNum = function() {
      const list = []
      for (let i = 0; i < line_index; i++) {
        list.push(<li key={i + 1}>{i + 1}</li>)
      }
      return <ul className="for-line-num">{list}</ul>
    }

    return (
      <div className={fullscreen}>
        <div className="for-controlbar">
          <ul>
            <li onClick={this.undo.bind(this, '### ')}>
              <i className="foricon for-undo" />
            </li>
            <li onClick={this.redo.bind(this, '### ')}>
              <i className="foricon for-redo" />
            </li>
            <li data-type="h1" onClick={this.insert.bind(this)}>
              H1
            </li>
            <li data-type="h2" onClick={this.insert.bind(this)}>
              H2
            </li>
            <li data-type="h3" onClick={this.insert.bind(this)}>
              H3
            </li>
            <li data-type="h4" onClick={this.insert.bind(this)}>
              H4
            </li>
            <li data-type="image" onClick={this.insert.bind(this)}>
              <i className="foricon for-image" />
            </li>
            <li data-type="link" onClick={this.insert.bind(this)}>
              <i className="foricon for-link" />
            </li>
            <li data-type="code" onClick={this.insert.bind(this)}>
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
            <div className="for-editor-wrapper">
              <div className="for-editor-wrapper-in">
                <div className="for-editor-block">
                  {lineNum()}
                  <div className="for-editor-content">
                    <pre> {value} </pre>
                    <textarea
                      ref={this.handleEditorRef}
                      value={value}
                      onChange={this.handleChange.bind(this)}
                      placeholder={this.props.placeholder}
                    />
                  </div>
                </div>
              </div>
            </div>
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
