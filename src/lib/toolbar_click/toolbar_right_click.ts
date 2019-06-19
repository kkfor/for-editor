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

function toolbar_right_columns_click($vm) {
  const { preview_switch, columns_switch } = $vm.state
  if (preview_switch) {
    if (columns_switch) {
      $vm.setState({
        columns_switch: false,
        preview_switch: false
      })
    } else {
      $vm.setState({
        columns_switch: true
      })
    }
  } else {
    if (columns_switch) {
      $vm.setState({
        columns_switch: false
      })
    } else {
      $vm.setState({
        preview_switch: true,
        columns_switch: true
      })
    }
    
  }
}

export const toolbar_right_click = (type, $vm) => {
  const right_click = {
    'preview': toolbar_right_preview_click,
    'expand': toolbar_right_expand_click,
    'columns': toolbar_right_columns_click
  }
  right_click[type]($vm)
}