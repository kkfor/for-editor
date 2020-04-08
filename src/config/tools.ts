import * as React from 'react'

export default (lang: any, editor: any) => {
  return {
    h1: {
      prefix: '# ',
      subfix: '',
      str: lang.h1
    },
    h2: {
      prefix: '## ',
      subfix: '',
      str: lang.h2
    },
    h3: {
      prefix: '### ',
      subfix: '',
      str: lang.h3
    },
    h4: {
      prefix: '#### ',
      subfix: '',
      str: lang.h4
    },
    img: {
      prefix: '![alt](',
      subfix: ')',
      str: 'url'
    },
    link: {
      prefix: '[title](',
      subfix: ')',
      str: 'url'
    },
    code: {
      prefix: '```',
      subfix: '\n\n```',
      str: 'language'
    },
    tab: {
      prefix: '  ',
      subfix: '',
      str: ''
    }
  }
} 