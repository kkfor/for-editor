import * as React from 'react'
import './index.scss'
import classNames from 'classnames'
import marked from '../helpers/marked'
import keydownListen from '../helpers/keydownListen'
import 'highlight.js/styles/tomorrow.css'
import '../fonts/iconfont.css'
import ToolbarLeft from '../toolbar/toolbar_left'
import ToolbarRight from '../toolbar/toolbar_right'
import { toolbar_right_click } from '../toolbar/toolbar_right_click'
import { toolbar_left_click } from '../toolbar/toolbar_left_click'

interface P {
  value: string
  lineNum: number
  onChange: (value: string) => void
  onSave: (value: string) => void
  placeholder: string
  fontSize: string
  disabled: boolean
  toolbars: object
  preview_switch: boolean
}

interface S {
  preview_switch: boolean
  expand_switch: boolean
  f_history: string[]
  f_history_index: number
  line_index: number
  value: string
}


class MdEditor extends React.Component<P, S> {
  constructor(props: P) {
    super(props)

    this.state = {
      preview_switch: props.preview_switch,
      expand_switch: false,
      f_history: [],
      f_history_index: 0,
      line_index: 1,
      value: props.value
    }
  }
  private $vm: HTMLTextAreaElement
  private currentTimeout: null | number | NodeJS.Timer

  static defaultProps = {
    placeholder: '请输入内容...',
    lineNum: true,
    onChange: () => { },
    onSave: () => { },
    fontSize: '14px',
    disabled: false,
    preview_switch: false
  }

  componentDidMount() {
    keydownListen(this)
  }

  componentDidUpdate(preProps) {
    const { value } = this.props
    const { f_history, f_history_index } = this.state
    if (preProps.value !== value) {
      this.reLineNum(value)
    }
    if (value !== f_history[f_history_index]) {
      window.clearTimeout(Number(this.currentTimeout))
      this.currentTimeout = setTimeout(() => {
        this.saveHistory(value)
      }, 500);
    }
  }

  // 输入框改变
  handleChange(e) {
    const value = e.target.value
    this.props.onChange(value)
  }

  // 保存记录
  saveHistory(value) {
    let { f_history, f_history_index } = this.state
    // 撤销后修改，删除当前以后记录
    f_history.splice(f_history_index + 1, f_history.length)
    if (f_history.length >= 20) {
      f_history.shift()
    }
    // 记录当前位置
    f_history_index = f_history.length
    f_history.push(value)
    this.setState({
      f_history,
      f_history_index
    }, () => {
      console.log(this.state.f_history)
    })
  }

  // 重新计算行号
  reLineNum(value) {
    const line_index = value ? value.split('\n').length : 1
    this.setState({
      line_index
    })
  }

  // 保存
  save() {
    this.props.onSave(this.$vm.value)
  }

  // 菜单点击
  toolBarLeftClick(type) {
    toolbar_left_click(type, this)
  }

  toolBarRightClick(type) {
    toolbar_right_click(type, this)
  }

  focusText() {
    this.$vm.focus()
  }

  render() {
    const { preview_switch, expand_switch, line_index } = this.state
    const { value, placeholder, fontSize, disabled } = this.props
    const previewClass = classNames({
      'for-panel': true,
      'for-editor-preview': true,
      'for-preview-hidden': !preview_switch
    })
    const editorClass = classNames({
      'for-editor-edit': true,
      'for-panel': true
    })
    const fullscreen = classNames({
      'for-container': true,
      'for-fullscreen': expand_switch
    })
    const lineNumStyles = classNames({
      'for-line-num': true,
      hidden: !this.props.lineNum
    })

    // 行号
    function lineNum() {
      const list = []
      for (let i = 0; i < line_index; i++) {
        list.push(<li key={i + 1}>{i + 1}</li>)
      }
      return <ul className={lineNumStyles}>{list}</ul>
    }

    return (
      <div className={fullscreen}>
        {/* 菜单栏 */}
        <div className="for-controlbar">
          <ToolbarLeft onClick={type => this.toolBarLeftClick(type)} />
          <ToolbarRight preview={preview_switch} expand={expand_switch} onClick={type => this.toolBarRightClick(type)} />
        </div>
        {/* 内容区 */}
        <div className="for-editor" style={{ fontSize }}>
          {/* 编辑区 */}
          <div className={editorClass} onClick={() => this.focusText()}>
            <div className="for-editor-block">
              {lineNum()}
              <div className="for-editor-content">
                <pre>{value} </pre>
                <textarea
                  // defaultValue={defalutValue}
                  ref={$vm => this.$vm = $vm}
                  value={value}
                  disabled={disabled}
                  onChange={e => this.handleChange(e)}
                  placeholder={placeholder}
                />
              </div>
            </div>
          </div>
          {/* 预览区 */}
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
