function toolbar_left_preview_click($vm) {
  $vm.setState({
    preview_switch: !$vm.preview_switch
  })
}

export const toolbar_left_click = (type, $vm) => {
  const left_click = {
    'preview': toolbar_left_preview_click
  }
  left_click[type]($vm)
}