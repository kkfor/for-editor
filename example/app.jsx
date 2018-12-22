import React, { Component } from 'react'
// import Editor from '../src/main'
import Editor from '../dist'

class App extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  handleChange(e) {
    const value = e.target.value
    this.setState({
      value
    })
  }

  render() {
    const { value } = this.state
    return (
      <div>
        <Editor value={value} onChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}

export default App