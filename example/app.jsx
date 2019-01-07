import React, { Component } from 'react'
import Editor from '../src/main'
// import Editor from '../dist'

class App extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    const value = `> \`for-editor\` is a markdown editor

# for-editor

this is a markdown editor

## for-editor

this is a markdown editor

### for-editor

\`\`\`js
const editor = 'for-editor'
\`\`\`

- item1
- item2
- item3

---

1. item1
2. item2
3. item3
`

    setTimeout(() => {
      this.setState({
        value
      })
    }, 200)
  }

  handleChange = value => {
    this.setState({
      value
    })
  }

  handleSave = () => {
    console.log('触发保存事件')
  }

  render() {
    const editorStyle = {
      boxShadow: '#999 0 0 12px',
      width: '60%',
      margin: '50px auto 0',
      borderRadius: '4px'
    }
    const { value } = this.state
    return (
      <div style={editorStyle}>
        <Editor
          style={editorStyle}
          value={value}
          onChange={this.handleChange}
          onSave={this.handleSave}
        />
      </div>
    )
  }
}

export default App
