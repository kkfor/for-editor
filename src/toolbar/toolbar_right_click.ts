function toolbar_right_preview_click($vm) {
  $vm.setState({
    preview_switch: !$vm.state.preview_switch
  })
}
function toolbar_right_expand_click($vm) {
  $vm.setState({
    expand_switch: !$vm.state.expand_switch
  })
}

export const toolbar_right_click = (type, $vm) => {
  const right_click = {
    'preview': toolbar_right_preview_click,
    'expand': toolbar_right_expand_click
  }
  right_click[type]($vm)
}