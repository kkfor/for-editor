function toolbar_right_preview_click($vm) {
  $vm.setState({
    preview_switch: !$vm.state.preview_switch
  })
}

export const toolbar_right_click = (type, $vm) => {
  const right_click = {
    'preview': toolbar_right_preview_click
  }
  right_click[type]($vm)
}