import * as React from 'react'
import { IToolbar, IWords } from '../index'
interface IP {
  onClick: (type: string) => void
  addImg: (file: File, index: number) => void
  toolbar: IToolbar
  words: IWords
}

interface IS {
  imgHidden: boolean
  imgList: File[]
}

class Toolbars extends React.Component<IP, IS> {
  static defaultProps = {
    onClick: () => {},
    toolbar: {},
    words: {}
  }

  private timer: number

  constructor(props: IP) {
    super(props)

    this.state = {
      imgHidden: true,
      imgList: []
    }
  }

  onClick(type: string) {
    this.props.onClick(type)
  }

  imgClick() {
    this.setState({
      imgHidden: !this.state.imgHidden
    })
  }

  imgMouseOver() {
    window.clearTimeout(this.timer)
    this.setState({
      imgHidden: false
    })
  }

  imgMouseOut() {
    this.timer = window.setTimeout(() => {
      this.setState({
        imgHidden: true
      })
    }, 150)
  }

  addImgUrl() {
    this.props.onClick('img')
  }

  addImgFile(e: any) {
    let { imgList } = this.state
    const index = imgList.length
    imgList.push(e.target.files[0])
    this.setState({
      imgList
    })
    this.props.addImg(e.target.files[0], index)
    e.target.value = ''
  }

  render() {
    const { toolbar, words } = this.props
    const { imgHidden } = this.state
    return (
      <ul>
        {toolbar.undo && (
          <li onClick={() => this.onClick('undo')} title={`${words.undo} (ctrl+z)`}>
            <i className="foricon for-undo" />
          </li>
        )}
        {toolbar.redo && (
          <li onClick={() => this.onClick('redo')} title={`${words.redo} (ctrl+y)`}>
            <i className="foricon for-redo" />
          </li>
        )}
        {toolbar.h1 && (
          <li onClick={() => this.onClick('h1')} title={words.h1}>
            H1
          </li>
        )}
        {toolbar.h2 && (
          <li onClick={() => this.onClick('h2')} title={words.h2}>
            H2
          </li>
        )}
        {toolbar.h3 && (
          <li onClick={() => this.onClick('h3')} title={words.h3}>
            H3
          </li>
        )}
        {toolbar.h4 && (
          <li onClick={() => this.onClick('h4')} title={words.h4}>
            H4
          </li>
        )}
        {toolbar.img && (
          <li className="for-toolbar-img" onMouseOver={() => this.imgMouseOver()} onMouseOut={() => this.imgMouseOut()}>
            <i className="foricon for-image" />
            <ul style={imgHidden ? {display: 'none'} : {}}>
              <li onClick={() => this.addImgUrl()}>{words.addImgLink}</li>
              <li>
                {words.addImg}
                <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" onChange={(e) => this.addImgFile(e)}/>
              </li>
            </ul>
          </li>
        )}
        {toolbar.link && (
          <li onClick={() => this.onClick('link')} title={words.link}>
            <i className="foricon for-link" />
          </li>
        )}
        {toolbar.code && (
          <li onClick={() => this.onClick('code')} title={words.code}>
            <i className="foricon for-code" />
          </li>
        )}
        {toolbar.save && (
          <li onClick={() => this.onClick('save')} title={`${words.save} (ctrl+s)`}>
            <i className="foricon for-save" />
          </li>
        )}
      </ul>
    )
  }
}

export default Toolbars
