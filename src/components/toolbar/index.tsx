import * as React from 'react'

interface IP {

}

interface IS {
}

class Toolbars extends React.Component<IP, IS> {
  static defaultProps = {
  }
  
  constructor(props: IP) {
    super(props)
  }

  render() {
    return (
      <ul>
      </ul>
    )
  }
}

export default Toolbars
