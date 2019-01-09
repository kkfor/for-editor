import insertText from '../../src/helpers/insertText'

const setup = () => {
  const textArea = document.createElement('textarea')

  return textArea
}

describe('insertText', () => {
  it('insert Fun', () => {
    const $vm = setup()
    insertText($vm, 'h1')
  })
})
