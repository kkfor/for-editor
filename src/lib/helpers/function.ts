function insertText($vm: HTMLTextAreaElement, params: any): string {
  const { prefix, str = '', subfix = '' } = params
  const value = $vm.value
  if ($vm.selectionStart || $vm.selectionStart === 0) {
    const start = $vm.selectionStart
    const end = $vm.selectionEnd

    const restoreTop = $vm.scrollTop

    if (start === end) {
      $vm.value =
        value.substring(0, start) +
        prefix +
        str +
        subfix +
        value.substring(end, value.length)
      $vm.selectionStart = start + prefix.length
      $vm.selectionEnd = end + prefix.length + str.length
    } else {
      $vm.value =
        value.substring(0, start) +
        prefix +
        value.substring(start, end) +
        subfix +
        value.substring(end, value.length)
      $vm.selectionStart = start + prefix.length
      $vm.selectionEnd = end + prefix.length
    }

    $vm.focus()
    if (restoreTop >= 0) {
      $vm.scrollTop = restoreTop
    }
  }
  return $vm.value
}

export {
  insertText
}
