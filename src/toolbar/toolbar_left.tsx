import * as React from 'react'
import classNames from 'classnames'
import 'highlight.js/styles/tomorrow.css'
import '../fonts/iconfont.css'

interface P {
  onClick: (type: string) => void
  toolbars: object,
}

interface S { }

class Toolbars extends React.Component<P, S> {
  constructor(props: P) {
    super(props)
  }

  static defaultProps = {
    onClick: () => { },
    toolbars: {}
  }

  // 快捷插入
  onClick(type) {
    this.props.onClick(type)
  }

  render() {
    return (
      <ul>
        <li onClick={() => this.onClick('undo')} title="上一步 (ctrl+z)">
          <i className="foricon for-undo" />
        </li>
        <li onClick={() => this.onClick('redo')} title="下一步 (ctrl+y)">
          <i className="foricon for-redo" />
        </li>
        <li onClick={() => this.onClick('h1')} title="一级标题">
          H1
            </li>
        <li onClick={() => this.onClick('h2')} title="二级标题">
          H2
            </li>
        <li onClick={() => this.onClick('h3')} title="三级标题">
          H3
            </li>
        <li onClick={() => this.onClick('h4')} title="四级标题">
          H4
            </li>
        <li onClick={() => this.onClick('image')} title="图片">
          <i className="foricon for-image" />
        </li>
        <li onClick={() => this.onClick('link')} title="超链接">
          <i className="foricon for-link" />
        </li>
        <li onClick={() => this.onClick('code')} title="代码块">
          <i className="foricon for-code" />
        </li>
        <li onClick={() => this.onClick('save')} title="保存 (ctrl+s)">
          <i className="foricon for-save" />
        </li>
      </ul>
    )
  }
}

export default Toolbars