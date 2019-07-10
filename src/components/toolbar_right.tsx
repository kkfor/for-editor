import * as React from 'react'
import classNames from 'classnames'

interface Toolbar {
  expand: boolean
  preview: boolean
  subfield: boolean
}
interface P {
  onClick: (type: string) => void
  toolbar: Toolbar
  preview: boolean
  expand: boolean
  subfield: boolean
  words: object
}

class Toolbars extends React.Component<P, {}> {
  static defaultProps = {
    onClick: () => { },
    toolbars: {},
    words: {}
  }
  
  // 快捷插入
  onClick(type: string) {
    this.props.onClick(type)
  }

  render() {
    const { preview, expand, subfield, toolbar, words } = this.props

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
          <li className={expandActive} onClick={() => this.onClick('expand')} title={expandActive ? words['fullscreen_off'] : words['fullscreen_on']}>
            {expandActive ? (
              <i className="foricon for-contract" />
            ) : (
              <i className="foricon for-expand" />
            )}
          </li>
        }
        {
          toolbar['preview'] &&
          <li className={previewActive} onClick={() => this.onClick('preview')} title={words['preview']}>
            {previewActive ? (
              <i className="foricon for-eye-off" />
            ) : (
              <i className="foricon for-eye" />
            )}
          </li>
        }
        {
          toolbar['subfield'] &&
          <li className={subfieldActive} onClick={() => this.onClick('subfield')} title={subfieldActive ? words['single_column'] : words['double_column']}>
            <i className="foricon for-subfield" />
          </li>
        }
      </ul >
    )
  }
}

export default Toolbars