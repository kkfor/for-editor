import React, { Component } from 'react'
import Editor from '../../src/index'
// import Editor from '../../dist'
import styles from './app.module.scss'
import value from '../static/help.md'

class App extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        value
      })
    }, 200)
  }

  handleChange(value) {
    this.setState({
      value
    })
  }

  handleSave(value) {
    console.log('触发保存事件', value)
  }

  render() {
    const { value } = this.state

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
          {/* <Editor
            height="100%"
            value={value}
            onChange={value => this.handleChange(value)}
            onSave={value => this.handleSave(value)}
          /> */}
          <Editor
            height="700px"
            toolbar={{
              h1: true,
              h2: true,
              h3: true,
              save: true,
              preview: true
            }}
            value={value}
            onChange={value => this.handleChange(value)}
            onSave={value => this.handleSave(value)}
          />
        </div>
      </div>
    )
  }
}

export default App
