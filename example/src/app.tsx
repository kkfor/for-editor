import React, { Component } from 'react'
import Editor from '../../src/index'
// import Editor from '../../dist'
import * as styles from './app.module.scss'
import * as value from '../static/help.md'

interface IS {
  value: string
  mobile: boolean
}


class App extends Component<{}, IS> {

  private $vm = React.createRef<Editor>()

  constructor(props: any) {
    super(props)

    this.state = {
      value: '',
      mobile: false
    }
  }

  componentDidMount() {
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
    setTimeout(() => {
      this.setState({
        value
      })
    }, 200)
  }

  resize() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      this.setState({
        mobile: false
      })
    } else {
      this.setState({
        mobile: true
      })
    }
  }

  handleChange(value: string) {
    this.setState({
      value
    })
  }

  handleSave(value: string) {
    console.log('触发保存事件', value)
  }

  addImg($file: File) {
    this.$vm.current.$img2Url($file.name, 'file_url')
    console.log($file)
  }

  render() {
    const { value, mobile } = this.state

    return (
      <div className={styles.main}>
        <div className={styles.top}>
          <h1>for-editor</h1>
          <ul>
            <li>
              <a
                href="https://github.com/kkfor/for-editor"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.editor}>
          {mobile && (
            <Editor
              ref={this.$vm}
              height="500px"
              toolbar={{
                h1: true,
                h2: true,
                h3: true,
                save: true,
                preview: true
              }}
              value={value}
              subfield={false}
              onChange={value => this.handleChange(value)}
              onSave={value => this.handleSave(value)}
            />
          )}
          {!mobile && (
            <Editor
              ref={this.$vm}
              language="en"
              height="700px"
              value={value}
              addImg={($file) => this.addImg($file)}
              onChange={value => this.handleChange(value)}
              onSave={value => this.handleSave(value)}
            />
          )}
        </div>
      </div>
    )
  }
}

export default App
