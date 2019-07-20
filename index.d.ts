declare module 'for-editor' {
  interface IP {
    value: string
    placeholder: string
    lineNum: string
    style: any
    height: string
    preview: boolean
    expand: boolean
    subfield: boolean
    language: string
    toolbar: any
  }
  export default class ForEditor extends React.Component<IP, any> {
  }
}