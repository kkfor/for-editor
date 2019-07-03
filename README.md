# for-editor

> for-editor 是一个基于 react 的 markdown 语法编辑器

### [English Documents](./README.EN.md)

- [demo](https://md.kkfor.com)
- [github](https://github.com/kkfor/for-editor)


### 安装

```js
npm install for-editor -S
```

### 使用

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
    return <Editor value={value} onChange={() => this.handleChange()} />
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### Api

#### 属性

| name        | type    | default     | description                        |
| ----------- | ------- | ----------- | ---------------------------------- |
| value       | String  | -           | 输入框内容                         |
| placeholder | String  | 开始编辑... | 占位文本                           |
| lineNum     | Boolean | true        | 是否显示行号                       |
| style       | Object  | -           | 编辑器样式                         |
| height      | String  | 600px       | 编辑器高度                         |
| preview     | Boolean | false       | 预览模式                           |
| expand      | Boolean | false       | 全屏模式                           |
| subfield    | Boolean | false       | 双栏模式(预览模式激活下有效)       |
| language    | String  | zh-CN       | 语言(支持 zh-CN:中文简体, en:英文) |
| toolbar     | Object  | 如下        | 自定义工具栏                       |

```js
/*
  默认工具栏按钮全部开启, 传入自定义对象
  例如: {
    h1: true, // h1
    code: true, // 代码块
    preview: true, // 预览
  }
  此时, 仅仅显示此三个功能键
  注:传入空对象则不显示工具栏
 */

toolbar: {
  h1: true, // h1
  h2: true, // h2
  h3: true, // h3
  h4: true, // h4
  img: true, // 图片
  link: true, // 链接
  code: true, // 代码块
  preview: true, // 预览
  expand: true, // 全屏
  /* v0.0.9 */
  undo: true, // 撤销
  redo: true, // 重做
  save: true, // 保存
  /* v0.2.3 */
  subfield: true, // 单双栏模式
}
```

#### 事件

| name     | type        | default | description    |
| -------- | ----------- | ------- | -------------- |
| onChange | function(e) | -       | 内容改变时回调 |
| onSave   | function(e) | -       | 保存时回调     |

#### 快捷键

| name   | description  |
| ------ | ------------ |
| tab    | 两个空格缩进 |
| ctrl+s | 保存         |
| ctrl+z | 上一步       |
| ctrl+y | 下一步       |

### 更新

- [Update Log](./doc/UPDATELOG.md)

### Licence

for-editor is [MIT Licence](./LICENSE).