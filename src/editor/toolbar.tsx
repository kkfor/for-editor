import * as React from 'react'
import './index.scss'
import classNames from 'classnames'
import marked from '../helpers/marked'
import textInsert from '../helpers/insertText'
import keydownListen from '../helpers/keydownListen'
import 'highlight.js/styles/tomorrow.css'
import '../fonts/iconfont.css'

interface P {
  toolbarLeftClick: (type: string) => void
  toolbarRightClick: (type: string) => void
  toolbars: object
}

interface S {
  preview: boolean
  expand: boolean
  f_history: string[]
  f_history_index: number
  line_index: number,
  value: string
}

class Toolbars extends React.Component<P, S> {
  constructor(props: P) {
    super(props)
  }

  // 快捷插入
  leftClick(type) {
    this.props.toolbarLeftClick(type)
    // const { $vm } = this
    // const type = e.currentTarget ? e.currentTarget.getAttribute('data-type') : e
    // textInsert($vm, type)
    // this.toPropsChange($vm.value)
    // this.saveHistory($vm.value)
  }

  rightClick(type) {
    this.props.toolbarRightClick(type)
  }

  render() {
    return (

      <div className="for-controlbar">
        <ul>
          <li onClick={() => this.leftClick('undo')} title="上一步 (ctrl+z)">
            <i className="foricon for-undo" />
          </li>
          <li onClick={() => this.leftClick('redo')} title="下一步 (ctrl+y)">
            <i className="foricon for-redo" />
          </li>
          <li onClick={() => this.leftClick('h1')} title="一级标题">
            H1
            </li>
          <li onClick={() => this.leftClick('h2')} title="二级标题">
            H2
            </li>
          <li onClick={() => this.leftClick('h3')} title="三级标题">
            H3
            </li>
          <li onClick={() => this.leftClick('h4')} title="四级标题">
            H4
            </li>
          <li onClick={() => this.leftClick('image')} title="图片">
            <i className="foricon for-image" />
          </li>
          <li onClick={() => this.leftClick('link')} title="超链接">
            <i className="foricon for-link" />
          </li>
          <li onClick={() => this.leftClick('code')} title="代码块">
            <i className="foricon for-code" />
          </li>
          <li onClick={() => this.leftClick('save')} title="保存 (ctrl+s)">
            <i className="foricon for-save" />
          </li>
        </ul>
        <ul>
          <li className={expandActive} onClick={() => this.rightClick('expand')}>
            {expandActive ? (
              <i className="foricon for-contract" />
            ) : (
                <i className="foricon for-expand" />
              )}
          </li>
          <li className={previewActive} onClick={() => this.rightClick('preview')}>
            {previewActive ? (
              <i className="foricon for-eye-off" />
            ) : (
                <i className="foricon for-eye" />
              )}
          </li>
        </ul>
      </div>
    )
  }
}

export default Toolbars