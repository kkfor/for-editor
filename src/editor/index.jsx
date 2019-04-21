import React from 'react'
import './index.scss'
import classNames from 'classnames'
import marked from '../helpers/marked'
import textInsert from '../helpers/insertText'
import keydownListen from '../helpers/keydownListen'
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
    placeholder: '请输入内容...',
    lineNum: true
  }

  componentDidMount() {
    keydownListen(this)
  }

  componentWillUpdate(props, state) {
    const { f_history } = this.state
    if (props.value && state.f_history.length === 0) {
      f_history.push(props.value)
      this.setState({
        f_history
      })
      this.handleLineIndex(props.value)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.handleLineIndex(nextProps.value)
    }
  }

  // 输入框改变
  handleChange = e => {
    const value = e.target.value
    this.saveHistory(value)
    this.props.onChange(value)
  }

  // 快捷插入
  insert = e => {
    const { $vm } = this
    const type = e.currentTarget ? e.currentTarget.getAttribute('data-type') : e
    textInsert($vm, type)
    this.props.onChange($vm.value)
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
    // 行号
    this.handleLineIndex(value)
  }

  handleLineIndex(value) {
    const line_index = value ? value.split('\n').length : 1
    this.setState({
      line_index
    })
  }

  undo = () => {
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
    this.handleLineIndex(value)
  }

  redo = () => {
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
    this.handleLineIndex(value)
  }

  // 预览
  preview = () => {
    this.setState({
      preview: !this.state.preview
    })
  }

  // 全屏
  expand = () => {
    this.setState({
      expand: !this.state.expand
    })
  }

  // 保存
  save = () => {
    this.props.onSave()
  }

  // 左侧空白区点击后，textarea聚焦
  focusText = () => {
    const { $vm } = this
    $vm.focus()
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
    const lineNumStyles = classNames({
      'for-line-num': true,
      hidden: !this.props.lineNum
    })

    const lineNum = function() {
      const list = []
      for (let i = 0; i < line_index; i++) {
        list.push(<li key={i + 1}>{i + 1}</li>)
      }
      return <ul className={lineNumStyles}>{list}</ul>
    }

    return (
      <div className={fullscreen} style={{ height: this.props.height }}>
        <div className="for-controlbar">
          <ul>
            <li onClick={this.undo} title="上一步 (ctrl+z)">
              <i className="foricon for-undo" />
            </li>
            <li onClick={this.redo} title="下一步 (ctrl+y)">
              <i className="foricon for-redo" />
            </li>
            <li data-type="h1" onClick={this.insert} title="一级标题">
              H1
            </li>
            <li data-type="h2" onClick={this.insert} title="二级标题">
              H2
            </li>
            <li data-type="h3" onClick={this.insert} title="三级标题">
              H3
            </li>
            <li data-type="h4" onClick={this.insert} title="四级标题">
              H4
            </li>
            <li data-type="image" onClick={this.insert} title="图片">
              <i className="foricon for-image" />
            </li>
            <li data-type="link" onClick={this.insert} title="超链接">
              <i className="foricon for-link" />
            </li>
            <li data-type="code" onClick={this.insert} title="代码块">
              <i className="foricon for-code" />
            </li>
            <li onClick={this.save} title="保存 (ctrl+s)">
              <i className="foricon for-save" />
            </li>
          </ul>
          <ul>
            <li className={expandActive} onClick={this.expand}>
              {expandActive ? (
                <i className="foricon for-contract" />
              ) : (
                <i className="foricon for-expand" />
              )}
            </li>
            <li className={previewActive} onClick={this.preview}>
              {previewActive ? (
                <i className="foricon for-eye-off" />
              ) : (
                <i className="foricon for-eye" />
              )}
            </li>
          </ul>
        </div>
        <div className="for-editor">
          <div className={editorClass} tabIndex="-1" onFocus={this.focusText}>
            <div className="for-editor-wrapper">
              <div className="for-editor-block">
                {lineNum()}
                <div className="for-editor-content">
                  <pre>{value} </pre>
                  <textarea
                    ref={this.handleEditorRef}
                    value={value}
                    onChange={this.handleChange}
                    placeholder={this.props.placeholder}
                  />
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
