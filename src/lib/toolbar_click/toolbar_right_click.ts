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

function toolbar_right_subfield_click($vm) {
  const { preview_switch, subfield_switch } = $vm.state
  if (preview_switch) {
    if (subfield_switch) {
      $vm.setState({
        subfield_switch: false,
        preview_switch: false
      })
    } else {
      $vm.setState({
        subfield_switch: true
      })
    }
  } else {
    if (subfield_switch) {
      $vm.setState({
        subfield_switch: false
      })
    } else {
      $vm.setState({
        preview_switch: true,
        subfield_switch: true
      })
    }
    
  }
}

export const toolbar_right_click = (type, $vm) => {
  const right_click = {
    'preview': toolbar_right_preview_click,
    'expand': toolbar_right_expand_click,
    'subfield': toolbar_right_subfield_click
  }
  right_click[type]($vm)
}