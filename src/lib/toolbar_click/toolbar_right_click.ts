function toolbarRightPreviewClick($vm) {
  $vm.setState({
    preview: !$vm.state.preview
  })
}
function toolbarRightExpandClick($vm) {
  $vm.setState({
    expand: !$vm.state.expand
  })
}

function toolbarRightSubfieldClick($vm) {
  const { preview, subfield } = $vm.state
  if (preview) {
    if (subfield) {
      $vm.setState({
        subfield: false,
        preview: false
      })
    } else {
      $vm.setState({
        subfield: true
      })
    }
  } else {
    if (subfield) {
      $vm.setState({
        subfield: false
      })
    } else {
      $vm.setState({
        preview: true,
        subfield: true
      })
    }
  }
}

export const toolbarRightClick = (type:string, $vm) => {
  const rightClick = {
    'preview': toolbarRightPreviewClick,
    'expand': toolbarRightExpandClick,
    'subfield': toolbarRightSubfieldClick
  }
  if (rightClick.hasOwnProperty(type)) {
    rightClick[type]($vm)
  }
}
