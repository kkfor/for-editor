import * as React from 'react'
export interface IToolbar {
    h1?: boolean
    h2?: boolean
    h3?: boolean
    h4?: boolean
    img?: boolean
    link?: boolean
    code?: boolean
    preview?: boolean
    expand?: boolean
    undo?: boolean
    redo?: boolean
    save?: boolean
    subfield?: boolean
}
export interface IWords {
    placeholder?: string
    h1?: string
    h2?: string
    h3?: string
    h4?: string
    undo?: string
    redo?: string
    img?: string
    link?: string
    code?: string
    save?: string
    preview?: string
    singleColumn?: string
    doubleColumn?: string
    fullscreenOn?: string
    fullscreenOff?: string
    addImgLink?: string
    addImg?: string
}
interface IP {
    value?: string
    lineNum?: number
    onChange?: (value: string) => void
    onSave?: (value: string) => void
    placeholder?: string
    fontSize?: string
    disabled?: boolean
    style?: object
    height?: string
    preview?: boolean
    expand?: boolean
    subfield?: boolean
    toolbar?: IToolbar
    language?: string
    addImg?: (file: File, index: number) => void
}
interface IS {
    preview: boolean
    expand: boolean
    subfield: boolean
    history: string[]
    historyIndex: number
    lineIndex: number
    value: string
    words: IWords
}
declare class MdEditor extends React.Component<IP, IS> {
    static defaultProps: {
        lineNum: boolean
        onChange: () => void
        onSave: () => void
        addImg: () => void
        fontSize: string
        disabled: boolean
        preview: boolean
        expand: boolean
        subfield: boolean
        style: {}
        toolbar: IToolbar
        language: string
    };

    $img2Url: (name: string, url: string) => void;
    
    private $vm;
    private $scrollEdit;
    private $scrollPreview;
    private $blockEdit;
    private $blockPreview;
    private currentTimeout;
}
export default MdEditor
