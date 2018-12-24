# for-editor

for-editor is a react markdown editor

- [在线预览](https://md.kkfor.com)
- [源码地址](https://github.com/kkfor/for-editor)

# Getting Started

### Install

```js
npm install for-editor -S
```

### Using for-editor

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Editor from 'for-editor'

class App extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  handleChange(value) {
    this.setState({
      value
    })
  }

  render() {
    const { value } = this.state
    return (
      <Editor value={value} onChange={this.handleChange.bind(this)} />
    )
  }
}

ReactDOM.render(
  <Editor />,
  document.getElementById('container')
)

```

### 更新日志

- [更新日志](./doc/UPDATELOG.md)
