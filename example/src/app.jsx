import React, { Component, Fragment } from 'react'
import Editor from './editor'
import styles from './app.module.scss'

class App extends Component {
  render() {
    return (
      <Fragment>
        <main className={`container ${styles.editor}`}>
          <Editor />
        </main>
      </Fragment>
    )
  }
}

export default App
