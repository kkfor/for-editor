import * as React from 'react'
import classNames from 'classnames'
import marked from './lib/helpers/marked'
import keydownListen from './lib/helpers/keydownListen'
import ToolbarLeft from './components/toolbar_left'
import ToolbarRight from './components/toolbar_right'
import { insertText } from './lib/helpers/function'
import 'highlight.js/styles/tomorrow.css'
import './lib/fonts/iconfont.css'
import './lib/css/index.scss'
import { CONFIG } from './lib'

export interface IToolbar {
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  img?: boolean
  link?: boolean
  code?: boolean
  preview?: boolean
  expand?: boolean
  undo?: boolean
  redo?: boolean
  save?: boolean
  subfield?: boolean
}

export interface IWords {
  placeholder?: string
  h1?: string
  h2?: string
  h3?: string
  h4?: string
  undo?: string
  redo?: string
  img?: string
  link?: string
  code?: string
  save?: string
  preview?: string
  singleColumn?: string
  doubleColumn?: string
  fullscreenOn?: string
  fullscreenOff?: string
}

interface ILeft {
  prefix: string
  subfix: string
  str: string
}
interface IP {
  value: string
  lineNum: number
  onChange: (value: string) => void
  onSave: (value: string) => void
  placeholder: string
  fontSize: string
  disabled: boolean
  style: object
  height: string
  preview: boolean
  expand: boolean
  subfield: boolean
  toolbar: IToolbar
  language: string
}

interface IS {
  preview: boolean
  expand: boolean
  subfield: boolean
  history: string[]
  historyIndex: number
  lineIndex: number
  value: string
  words: IWords
}

class MdEditor extends React.Component<IP, IS> {
  static defaultProps = {
    lineNum: true,
    onChange: () => {},
    onSave: () => {},
    fontSize: '14px',
    disabled: false,
    preview: false,
    expand: false,
    subfield: false,
    style: {},
    toolbar: CONFIG.toolbar,
    language: 'zh-CN'
  }
  private $vm = React.createRef<HTMLTextAreaElement>()
  private $scrollEdit = React.createRef<HTMLDivElement>()
  private $scrollPreview = React.createRef<HTMLDivElement>()
  private $blockEdit = React.createRef<HTMLDivElement>()
  private $blockPreview = React.createRef<HTMLDivElement>()
  private currentTimeout: number
  constructor(props: IP) {
    super(props)

    this.state = {
      preview: props.preview,
      expand: props.expand,
      subfield: props.subfield,
      history: [],
      historyIndex: 0,
      lineIndex: 1,
      value: props.value,
      words: {}
    }
  }

  componentDidMount() {
    const { value } = this.props
    // keydownListen(this)
    this.reLineNum(value)
    this.initLanguage()
  }

  componentDidUpdate(preProps: IP) {
    const { value } = this.props
    const { history, historyIndex } = this.state
    if (preProps.value !== value) {
      this.reLineNum(value)
    }
    if (value !== history[historyIndex]) {
      window.clearTimeout(this.currentTimeout)
      this.currentTimeout = window.setTimeout(() => {
        this.saveHistory(value)
      }, 500)
    }
  }

  initLanguage() {
    const { language } = this.props
    const lang = CONFIG.langList.indexOf(language) >= 0 ? language : 'zh-CN'
    this.setState({
      words: CONFIG.language[lang]
    })
  }

  // 输入框改变
  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    this.props.onChange(value)
  }

  // 保存记录
  saveHistory(value: string) {
    let { history, historyIndex } = this.state
    // 撤销后修改，删除当前以后记录
    history.splice(historyIndex + 1, history.length)
    if (history.length >= 20) {
      history.shift()
    }
    // 记录当前位置
    historyIndex = history.length
    history.push(value)
    this.setState({
      history,
      historyIndex
    })
  }

  // 重新计算行号
  reLineNum(value: string) {
    const lineIndex = value ? value.split('\n').length : 1
    this.setState({
      lineIndex
    })
  }

  // 保存
  save() {
    this.props.onSave(this.$vm.current!.value)
  }

  // 撤销
  undo() {
    let { history, historyIndex } = this.state
    historyIndex = historyIndex - 1
    if (historyIndex < 0) return
    this.props.onChange(history[historyIndex])
    this.setState({
      historyIndex
    })
  }

  // 重做
  redo() {
    let { history, historyIndex } = this.state
    historyIndex = historyIndex + 1
    if (historyIndex >= history.length) return
    this.props.onChange(history[historyIndex])
    this.setState({
      historyIndex
    })
  }

  // 菜单点击
  toolBarLeftClick(type: string) {
    const { words } = this.state
    const insertTextObj: any = {
      h1: {
        prefix: '# ',
        subfix: '',
        str: words.h1
      },
      h2: {
        prefix: '## ',
        subfix: '',
        str: words.h2
      },
      h3: {
        prefix: '### ',
        subfix: '',
        str: words.h3
      },
      h4: {
        prefix: '#### ',
        subfix: '',
        str: words.h4
      },
      img: {
        prefix: '![alt](',
        subfix: ')',
        str: 'url'
      },
      link: {
        prefix: '[title](',
        subfix: ')',
        str: 'url'
      },
      code: {
        prefix: '```',
        subfix: '\n\n```',
        str: 'language'
      },
      tab: {
        prefix: '  ',
        subfix: '',
        str: ''
      }
    }

    if (insertTextObj.hasOwnProperty(type)) {
      if (this.$vm.current) {
        insertText(this.$vm.current, insertTextObj[type])
      }
    }

    const otherLeftClick: any = {
      undo: this.undo,
      redo: this.redo,
      save: this.save
    }
    if (otherLeftClick.hasOwnProperty(type)) {
      otherLeftClick[type]()
    }
  }

  // 右侧菜单
  toolBarRightClick = (type: string): void => {
    const toolbarRightPreviewClick = () => {
      this.setState({
        preview: !this.state.preview
      })
    }
    const toolbarRightExpandClick = () => {
      this.setState({
        expand: !this.state.expand
      })
    }

    const toolbarRightSubfieldClick = () => {
      const { preview, subfield } = this.state
      if (preview) {
        if (subfield) {
          this.setState({
            subfield: false,
            preview: false
          })
        } else {
          this.setState({
            subfield: true
          })
        }
      } else {
        if (subfield) {
          this.setState({
            subfield: false
          })
        } else {
          this.setState({
            preview: true,
            subfield: true
          })
        }
      }
    }

    const rightClick: any = {
      preview: toolbarRightPreviewClick,
      expand: toolbarRightExpandClick,
      subfield: toolbarRightSubfieldClick
    }
    if (rightClick.hasOwnProperty(type)) {
      rightClick[type]()
    }
  }

  focusText = (): void => {
    this.$vm.current!.focus()
  }

  handleScoll = (e: React.UIEvent<HTMLDivElement>): void => {
    const radio =
      this.$blockEdit.current!.scrollTop /
      (this.$scrollEdit.current!.scrollHeight - e.currentTarget.offsetHeight)
    this.$blockPreview.current!.scrollTop =
      (this.$scrollPreview.current!.scrollHeight - this.$blockPreview.current!.offsetHeight) * radio
  }

  render() {
    const { preview, expand, subfield, lineIndex, words } = this.state
    const { value, placeholder, fontSize, disabled, height, style, toolbar } = this.props
    const editorClass = classNames({
      'for-editor-edit': true,
      'for-panel': true,
      'for-active': preview && subfield,
      'for-edit-preview': preview && !subfield
    })
    const previewClass = classNames({
      'for-panel': true,
      'for-editor-preview': true,
      'for-active': preview && subfield
    })
    const fullscreen = classNames({
      'for-container': true,
      'for-fullscreen': expand
    })
    const lineNumStyles = classNames({
      'for-line-num': true,
      hidden: !this.props.lineNum
    })

    // 行号
    function lineNum() {
      const list = []
      for (let i = 0; i < lineIndex; i++) {
        list.push(<li key={i + 1}>{i + 1}</li>)
      }
      return <ul className={lineNumStyles}>{list}</ul>
    }

    return (
      <div className={fullscreen} style={{ height, ...style }}>
        {/* 菜单栏 */}
        {Boolean(Object.keys(toolbar).length) && (
          <div className="for-controlbar">
            <ToolbarLeft
              toolbar={toolbar}
              words={words}
              onClick={(type) => this.toolBarLeftClick(type)}
              {...this.props}
            />
            <ToolbarRight
              toolbar={toolbar}
              words={words}
              preview={preview}
              expand={expand}
              subfield={subfield}
              onClick={(type) => this.toolBarRightClick(type)}
            />
          </div>
        )}
        {/* 内容区 */}
        <div className="for-editor" style={{ fontSize }}>
          {/* 编辑区 */}
          <div
            className={editorClass}
            ref={this.$blockEdit}
            onScroll={this.handleScoll}
            onClick={this.focusText}
          >
            <div className="for-editor-block" ref={this.$scrollEdit}>
              {lineNum()}
              <div className="for-editor-content">
                <pre>{value} </pre>
                <textarea
                  ref={this.$vm}
                  value={value}
                  disabled={disabled}
                  onChange={this.handleChange}
                  placeholder={placeholder ? placeholder : words.placeholder}
                />
              </div>
            </div>
          </div>
          {/* 预览区 */}
          <div className={previewClass} ref={this.$blockPreview}>
            <div
              ref={this.$scrollPreview}
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
