import * as React from 'react'

interface IP {
  tools: any
}

interface IS {}

class Toolbars extends React.Component<IP, IS> {
  static defaultProps = {}

  constructor(props: IP) {
    super(props)
  }

  render() {
    const { tools } = this.props

    const allTools = tools

    console.log(allTools, 'sss')

    return (
      <div className="for-toolbar">
        <ul>
          {allTools.map((item, index) => (
            <li>
              <i className="foricon for-undo" />
            </li>
          ))}
        </ul>
        <ul>
          <li>
            <i className="foricon for-contract" />
          </li>
        </ul>
      </div>
    )
  }
}

export default Toolbars
