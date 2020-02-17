import zhCN from './lang/zh-CN/index.json'
import en from './lang/en/index.json'
import { IToolbar, IWords } from '../index'
export interface ICONFIG {
  language: {
    'zh-CN': IWords
    en: IWords
    [key: string]: IWords
  }
  langList: string[]
  toolbar: IToolbar
}

// 编辑栏设置
export const CONFIG: ICONFIG = {
  language: {
    'zh-CN': zhCN,
    en,
  },
  langList: ['zh-CN', 'en'],
  toolbar: {
    h1: true,
    h2: true,
    h3: true,
    h4: true,
    img: true,
    para: true,
    table: true,
    quote: true,
    link: true,
    innercode: true,
    code: true,
    katex: true,
    preview: true,
    expand: true,
    undo: true,
    redo: true,
    save: true,
    subfield: true,
  }
}
