import React, { Component } from 'react'
import Editor from '../src/main'
// import Editor from '../dist'

const value = `
> \`for-editor\` is a markdown editor

# for-editor

this is a markdown editor

## for-editor

this is a [kkfor](kkfor.com)markdown editor

### for-editor

this is a markdown editor

- item1
- item2
- item3

---

1. item1
2. item2
3. item3

\`\`\`js
const editor = 'for-editor'
\`\`\`

`


class App extends Component {
  constructor() {
    super()
    this.state = {
      value: value
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
      <div style={{width: '70%', margin: '0 auto'}}>
        <Editor value={value} onChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}

export default App
