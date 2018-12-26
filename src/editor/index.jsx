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
      $vm: null,
      preview: false,
      expand: false,
      f_history: [],
      f_history_index: 0
    }
  }

  // 输入框dom
  handleEditorNode = $vm => {
    const { f_history } = this.state
    f_history.push($vm.value)
    this.setState({
      $vm,
      f_history
    })
  }

  // 输入框改变
  handleChange(e) {
    const value = e.target.value
    this.saveHistory(value)
  }

  // 快捷插入
  insert(insertValue) {
    const $vm = this.state.$vm
    const value = $vm.value
    if ($vm.selectionStart || $vm.selectionStart === 0) {
      let start = $vm.selectionStart
      let end = $vm.selectionEnd

      const restoreTop = $vm.scrollTop

      $vm.value =
        value.substring(0, start) +
        insertValue +
        value.substring(end, value.length)

      $vm.focus()
      if (restoreTop >= 0) {
        $vm.scrollTop = restoreTop
      }
      $vm.selectionStart = start + insertValue.length
      $vm.selectionEnd = end + insertValue.length
    }

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
            <li onClick={this.undo.bind(this, '### ')}>
              <i className="foricon for-undo" />
            </li>
            <li onClick={this.redo.bind(this, '### ')}>
              <i className="foricon for-redo" />
            </li>
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
