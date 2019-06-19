import * as React from 'react'
import classNames from 'classnames'

interface P {
  onClick: (type: string) => void
  toolbar: object,
}

interface S { }

class Toolbars extends React.Component<P, S> {
  constructor(props: P) {
    super(props)
  }

  static defaultProps = {
    onClick: () => { },
    toolbar: {}
  }

  // 快捷插入
  onClick(type) {
    this.props.onClick(type)
  }

  render() {
    const { toolbar } = this.props
    return (
      <ul>
        {
          toolbar['undo'] &&
          <li onClick={() => this.onClick('undo')} title="上一步 (ctrl+z)">
            <i className="foricon for-undo" />
          </li>
        }
        {
          toolbar['redo'] &&
          <li onClick={() => this.onClick('redo')} title="下一步 (ctrl+y)">
            <i className="foricon for-redo" />
          </li>
        }
        {
          toolbar['h1'] &&
          <li onClick={() => this.onClick('h1')} title="一级标题">
            H1
        </li>
        }
        {
          toolbar['h2'] &&
          <li onClick={() => this.onClick('h2')} title="二级标题">
            H2
        </li>
        }
        {
          toolbar['h3'] &&
          <li onClick={() => this.onClick('h3')} title="三级标题">
            H3
        </li>
        }
        {
          toolbar['h4'] &&
          <li onClick={() => this.onClick('h4')} title="四级标题">
            H4
        </li>
        }
        {
          toolbar['img'] &&
          <li onClick={() => this.onClick('img')} title="图片">
            <i className="foricon for-image" />
          </li>
        }
        {
          toolbar['link'] &&
          <li onClick={() => this.onClick('link')} title="超链接">
            <i className="foricon for-link" />
          </li>
        }
        {
          toolbar['code'] &&
          <li onClick={() => this.onClick('code')} title="代码块">
            <i className="foricon for-code" />
          </li>
        }
        {
          toolbar['save'] &&
          <li onClick={() => this.onClick('save')} title="保存 (ctrl+s)">
            <i className="foricon for-save" />
          </li>
        }
      </ul>
    )
  }
}

export default Toolbars