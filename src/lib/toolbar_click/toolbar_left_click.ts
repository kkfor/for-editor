import { insertText } from '../helpers/function'

function toolbar_left_undo_click($vm) {
  let { f_history, f_history_index } = $vm.state
  f_history_index = f_history_index - 1
  if (f_history_index < 0) return
  $vm.props.onChange(f_history[f_history_index])
  $vm.setState({
    f_history_index
  })
}

function toolbar_left_redo_click($vm) {
  let { f_history, f_history_index } = $vm.state
  f_history_index = f_history_index + 1
  if (f_history_index >= f_history.length) return
  $vm.props.onChange(f_history[f_history_index])
  $vm.setState({
    f_history_index
  })
}

function toolbar_left_save_click($vm) {
  $vm.save()
}

export const toolbar_left_click = (type, $vm) => {
  const { words } = $vm.state
  const insert_text_obj = {
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

  if (insert_text_obj.hasOwnProperty(type)) {
    insertText($vm, insert_text_obj[type])
  }

  const other_left_click = {
    undo: toolbar_left_undo_click,
    redo: toolbar_left_redo_click,
    save: toolbar_left_save_click
  }
  if (other_left_click.hasOwnProperty(type)) {
    other_left_click[type]($vm)
  }
}