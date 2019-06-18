import * as React from 'react'
import classNames from 'classnames'

interface P {
  onClick: (type: string) => void
  toolbars: object,
  preview: boolean,
  expand: boolean
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
    const { preview, expand } = this.props

    const previewActive = classNames({
      'for-active': preview
    })
    const expandActive = classNames({
      'for-active': expand
    })
    return (
      <ul>
        <li className={expandActive} onClick={() => this.onClick('expand')}>
          {expandActive ? (
            <i className="foricon for-contract" />
          ) : (
              <i className="foricon for-expand" />
            )}
        </li>
        <li className={previewActive} onClick={() => this.onClick('preview')}>
          {previewActive ? (
            <i className="foricon for-eye-off" />
          ) : (
              <i className="foricon for-eye" />
            )}
        </li>
        <li onClick={() => this.onClick('preview')}>
          <i className="foricon for-columns" />
        </li>
      </ul>
    )
  }
}

export default Toolbars