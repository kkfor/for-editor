import insert from '../helpers/insertText'

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

function toolbar_left_h1_click($vm) {
  insert($vm, '# ', '一级标题')
}

function toolbar_left_h2_click($vm) {
  insert($vm, '## ', '二级标题')
}

function toolbar_left_h3_click($vm) {
  insert($vm, '### ', '三级标题')
}

function toolbar_left_h4_click($vm) {
  insert($vm, '#### ', '四级标题')
}

function toolbar_left_img_click($vm) {
  insert($vm, '![alt](', 'url', ')')
}

function toolbar_left_link_click($vm) {
  insert($vm, '[title](', 'url', ')')
}

function toolbar_left_code_click($vm) {
  insert($vm, '```', 'language', '\n\n```')
}

function toolbar_left_save_click($vm) {
  $vm.save()
}

function toolbar_left_tab_click($vm) {
  insert($vm, '  ')
}

export const toolbar_left_click = (type, $vm) => {
  const left_click = {
    'undo': toolbar_left_undo_click,
    'redo': toolbar_left_redo_click,
    'h1': toolbar_left_h1_click,
    'h2': toolbar_left_h2_click,
    'h3': toolbar_left_h3_click,
    'h4': toolbar_left_h4_click,
    'img': toolbar_left_img_click,
    'link': toolbar_left_link_click,
    'code': toolbar_left_code_click,
    'save': toolbar_left_save_click,
  }
  left_click[type]($vm)
}