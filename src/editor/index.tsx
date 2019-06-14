import * as React from 'react'
import './index.scss'
import classNames from 'classnames'
import marked from '../helpers/marked'
import textInsert from '../helpers/insertText'
import keydownListen from '../helpers/keydownListen'
import 'highlight.js/styles/tomorrow.css'
import '../fonts/iconfont.css'
import ToolbarLeft from '../toolbar/toolbar_left'
import ToolbarRight from '../toolbar/toolbar_right'
import { toolbar_right_click } from '../toolbar/toolbar_right_click'

interface P {
  defaultValue: string
  value: string
  lineNum: number
  onChange: (value: string, render: string) => void
  onSave: (value: string, render: string) => void
  placeholder: string
  fontSize: string
  disabled: boolean
  toolbars: object
}

interface S {
  preview_switch: boolean
  expand: boolean
  f_history: string[]
  f_history_index: number
  line_index: number
  value: string
}


class MdEditor extends React.Component<P, S> {
  constructor(props: P) {
    super(props)

    this.state = {
      preview_switch: false,
      expand: false,
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
  handleChange(e) {
    const value = e.target.value
    this.setState({
      value
    })
    this.saveHistory(value)
    this.toPropsChange(value)
  }

  toPropsChange(value) {
    this.props.onChange(value, marked(value))
    this.setState({
      value
    })
  }

  // 快捷插入
  insert = e => {
    const { $vm } = this
    const type = e.currentTarget ? e.currentTarget.getAttribute('data-type') : e
    textInsert($vm, type)
    this.toPropsChange($vm.value)
    this.saveHistory($vm.value)
  }

  // 保存记录
  saveHistory(value) {
    let { f_history, f_history_index } = this.state
    window.clearTimeout(Number(this.currentTimeout))
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
    this.props.onChange(value, marked(value))
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
    this.props.onChange(value, marked(value))
    this.handleLineIndex(value)
  }

  // 预览
  preview() {
    // this.setState({
    //   preview_switch: !this.state.preview
    // })
  }

  // 全屏
  expand = () => {
    this.setState({
      expand: !this.state.expand
    })
  }

  // 保存
  save() {
    const value = this.$vm.value
    this.props.onSave(this.$vm.value, marked(value))
  }

  // 左侧空白区点击后，textarea聚焦
  focusText() {
    const { $vm } = this
    $vm.focus()
  }

  toolBarLeftClick(type) {
    // toolbar_right_click(type)
  }

  toolBarRightClick(type) {
    toolbar_right_click(type, this)
  }

  render() {
    const { preview_switch, expand, line_index } = this.state
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
      'for-fullscreen': expand
    })
    const lineNumStyles = classNames({
      'for-line-num': true,
      hidden: !this.props.lineNum
    })

    const lineNum = function () {
      const list = []
      for (let i = 0; i < line_index; i++) {
        list.push(<li key={i + 1}>{i + 1}</li>)
      }
      return <ul className={lineNumStyles}>{list}</ul>
    }

    return (
      <div className={fullscreen}>
        <div className="for-controlbar">
          <ToolbarLeft onClick={type => this.toolBarLeftClick(type)} />
          <ToolbarRight preview={preview_switch} expand={expand} onClick={type => this.toolBarRightClick(type)} />
        </div>
        <div className="for-editor" style={{ fontSize }}>
          <div className={editorClass} onFocus={() => this.focusText()}>
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
          <div className={previewClass}>
            {
              defaultValue ?
                <div
                  className="for-preview for-markdown-preview"
                  dangerouslySetInnerHTML={{ __html: marked(defaultValue) }}
                /> :
                <div
                  className="for-preview for-markdown-preview"
                  dangerouslySetInnerHTML={{ __html: marked(value) }}
                />
            }
          </div>
        </div>
      </div>
    )
  }
}

export default MdEditor
