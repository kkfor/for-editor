import { insertText } from '../helpers/function'

function toolbarLeftUndoClick($vm) {
  let { history, historyIndex } = $vm.state
  historyIndex = historyIndex - 1
  if (historyIndex < 0) return
  $vm.props.onChange(history[historyIndex])
  $vm.setState({
    historyIndex
  })
}

function toolbarLeftRedoClick($vm) {
  let { history, historyIndex } = $vm.state
  historyIndex = historyIndex + 1
  if (historyIndex >= history.length) return
  $vm.props.onChange(history[historyIndex])
  $vm.setState({
    historyIndex
  })
}

function toolbarLeftSaveClick($vm) {
  $vm.save()
}

export const toolbarLeftClick = (type:string, $vm) => {
  const { words } = $vm.state
  const insertTextObj = {
    'h1': {
      prefix: '# ',
      subfix: '',
      str: words.h1
    },
    'h2': {
      prefix: '## ',
      subfix: '',
      str: words.h2
    },
    'h3': {
      prefix: '### ',
      subfix: '',
      str: words.h3
    },
    'h4': {
      prefix: '#### ',
      subfix: '',
      str: words.h4
    },
    'img': {
      prefix: '![alt](',
      subfix: ')',
      str: 'url'
    },
    'link': {
      prefix: '[title](',
      subfix: ')',
      str: 'url'
    },
    'code': {
      prefix: '```',
      subfix: '\n\n```',
      str: 'language'
    },
    'tab': {
      prefix: '  ',
      subfix: '',
      str: ''
    }
  }

  if (insertTextObj.hasOwnProperty(type)) {
    insertText($vm, insertTextObj[type])
  }

  const otherLeftClick = {
    undo: toolbarLeftUndoClick,
    redo: toolbarLeftRedoClick,
    save: toolbarLeftSaveClick
  }
  if (otherLeftClick.hasOwnProperty(type)) {
    otherLeftClick[type]($vm)
  }
}
