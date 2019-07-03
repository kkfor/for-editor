# for-editor

> for-editor-A markdown editor based on React

- [demo](https://md.kkfor.com)
- [github](https://github.com/kkfor/for-editor)

### Install

```js
npm install for-editor -S
```

### Use

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

#### props

| name        | type    | default                     | description                                                                                            |
| ----------- | ------- | --------------------------- | ------------------------------------------------------------------------------------------------------ |
| value       | String  | -                           | value                                                                                                  |
| language    | String  | zh-CN                       | Language switch, zh-CN: Simplified Chinese, en: English                                                |
| placeholder | String  | Begin editing...            | The default prompt text when the textarea is empty                                                     |
| lineNum     | Boolean | true                        | Show lineNum                                                                                           |
| style       | Object  | -                           | editor styles                                                                                          |
| height      | String  | 600px                       | editor height                                                                                          |
| preview     | Boolean | false                       | preview switch                                                                                         |
| expand      | Boolean | false                       | fullscreen switch                                                                                      |
| subfield    | Boolean | false                       | true: Double columns - Edit preview same screen(notice: preview: true), Single Columns - otherwise not |
| toolbar     | Object  | As in the following example | toolbars                                                                                               |

```js
/*
  The default toolbar properties are all true,
  You can customize the object to cover them.
  eg: {
    h1: true,
    code: true,
    preview: true,
  }
  At this point, the toolbar only displays the three function keys.
  notice: Toolbar will be hidden when empty object.
 */

toolbar: {
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  img: true,
  link: true,
  code: true,
  preview: true,
  expand: true,
  /* v0.0.9 */
  undo: true,
  redo: true,
  save: true,
  /* v0.2.3 */
  subfield: true
}
```

#### events

| name     | params        | default | description                                 |
| -------- | ------------- | ------- | ------------------------------------------- |
| onChange | String: value | -       | Edit area change callback event             |
| onSave   | String: value | -       | Ctrl+s and click save button callback event |

#### hot key

| name   | description |
| ------ | ----------- |
| tab    | two space   |
| ctrl+s | save        |
| ctrl+z | undo        |
| ctrl+y | redo        |

### Update

- [Update Log](./doc/UPDATELOG.md)

# Licence

for-editor is [MIT Licence](./LICENSE).

