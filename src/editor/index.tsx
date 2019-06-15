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
  defaultValue: string
  value: string
  lineNum: number
  onChange: (value: string, render: string) => void
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
  private f_history: string[] = []
  private f_history_index: number = 0

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

  componentDidUpdate(props, state) {
    // console.log(props)
    // console.log(this.props)
    // console.log(state)
    // console.log(this.state)
    if(props.value === this.props.value) return 
    window.clearTimeout(Number(this.currentTimeout))
    this.currentTimeout = setTimeout(() => {
      this.saveHistory(this.props.value)
    }, 500);
  }

  // 输入框改变
  handleChange(e) {
    const value = e.target.value
    this.props.onChange(value, marked(value))
  }

  // 保存记录
  saveHistory(value) {
    let { f_history, f_history_index } = this.state
    // 撤销后修改，删除当前以后记录
    f_history.splice(f_history_index + 1, f_history.length)
    // 记录当前位置
    f_history_index = f_history.length
    f_history.push(value)
    this.setState({
      f_history,
      f_history_index
    })
  }

  toolBarLeftClick(type) {
    toolbar_left_click(type, this)
  }

  toolBarRightClick(type) {
    toolbar_right_click(type, this)
  }

  reRender() {

  }

  render() {
    const { preview_switch, expand_switch, line_index } = this.state
    const { value, placeholder, defaultValue, fontSize, disabled } = this.props
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
          <div className={editorClass}>
            <div className="for-editor-block">
              {lineNum()}
              <div className="for-editor-content">
                <pre>{value} </pre>
                <textarea
                  ref={$vm => this.$vm = $vm}
                  defaultValue={defaultValue}
                  readOnly={!!defaultValue}
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
