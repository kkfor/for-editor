# for-editor

for-editor is a react markdown editor

- [demo](https://md.kkfor.com)
- [github](https://github.com/kkfor/for-editor)

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
  <App />,
  document.getElementById('root')
)

```

### Api

#### props

| name | type | default | description |
| - | - | - | - |
| placeholder | String | 请输入内容... | 占位文本 |
| value | String| - |输入框内容 |
| lineNum | Boolean| true | 是否显示行号

#### events

| name | type | default | description |
| - | - | - | - |
| onChange | function(e) | - | 内容改变时回调 |
| onSave | function(e) | - | 保存时回调 |

#### hot key

| name | description |
| - | - |
| tab | 两个空格缩进 |
| ctrl+s | 保存 |
| ctrl+z | 上一步 |
| ctrl+y | 下一步 |

### Update

- [Update Log](./doc/UPDATELOG.md)
