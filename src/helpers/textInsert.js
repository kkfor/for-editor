function insert($vm, insertValue, cursorStart, cursorEnd) {
  const value = $vm.value
  console.log($vm.selectionStart, $vm.selectionEnd, 'xxx')
  debugger
  if ($vm.selectionStart || $vm.selectionStart === 0) {
    let start = $vm.selectionStart
    let end = $vm.selectionEnd

    const restoreTop = $vm.scrollTop

    $vm.value =
      value.substring(0, start) +
      insertValue +
      value.substring(end, value.length)

    $vm.focus()
    if (restoreTop >= 0) {
      $vm.scrollTop = restoreTop
    }
    // $vm.selectionStart = start + insertValue.length
    // $vm.selectionEnd = end + insertValue.length
    $vm.selectionStart = start + cursorStart
    $vm.selectionEnd = end + cursorEnd
  }
}

const toolbar = {
  code($vm) {
    insert($vm, '```language\n\n```', 3, 11)
  },
  h1($vm) {
    insert($vm, '# 一级标题', 2, 6)
  },
  h2($vm) {
    insert($vm, '## 二级标题', 3, 7)
  },
  h3($vm) {
    insert($vm, '## 二级标题', 3, 7)
  },
  h4($vm) {
    insert($vm, '### 二级标题', 4, 8)
  },
  image($vm) {
    insert($vm, '![alt](url)', 7, 10)
  },
  link($vm) {
    insert($vm, '[title](url)', 8, 11)
  }
}

export default ($vm, type) => {
  return toolbar[type]($vm)
}
