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
| value | String| - |输入框内容 |
| placeholder | String | 请输入内容... | 占位文本 |
| lineNum | Boolean| true | 是否显示行号 |
| style | Object | - | 编辑器样式 |
| height | String | 600px | 编辑器高度 |
| preview | Boolean | false | 预览模式 |
| expand | Boolean | false | 全屏模式 |
| subfield | Boolean | false | 双栏模式 |

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
