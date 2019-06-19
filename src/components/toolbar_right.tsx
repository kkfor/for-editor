import * as React from 'react'
import classNames from 'classnames'

interface P {
  onClick: (type: string) => void
  toolbar: object,
  preview: boolean,
  expand: boolean,
  subfield: boolean
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
    const { preview, expand, subfield, toolbar } = this.props

    const previewActive = classNames({
      'for-active': preview
    })
    const expandActive = classNames({
      'for-active': expand
    })
    const subfieldActive = classNames({
      'for-active': subfield
    })
    return (
      <ul>
        {
          toolbar['expand'] &&
          <li className={expandActive} onClick={() => this.onClick('expand')}>
            {expandActive ? (
              <i className="foricon for-contract" />
            ) : (
                <i className="foricon for-expand" />
              )}
          </li>
        }
        {
          toolbar['preview'] &&
          <li className={previewActive} onClick={() => this.onClick('preview')}>
            {previewActive ? (
              <i className="foricon for-eye-off" />
            ) : (
                <i className="foricon for-eye" />
              )}
          </li>
        }
        {
          toolbar['subfield'] &&
          <li className={subfieldActive} onClick={() => this.onClick('subfield')}>
            <i className="foricon for-subfield" />
          </li>
        }
      </ul>
    )
  }
}

export default Toolbars