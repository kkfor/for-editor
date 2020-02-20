import mermaid from 'mermaid'

mermaid.mermaidAPI.initialize({
  theme: 'forest',
  logLevel: 1,
  securityLevel: 'strict',
  startOnLoad: true,
  arrowMarkerAbsolute: false,

  flowchart: {
    htmlLabels: true,
    curve: 'linear'
  },
  sequence: {
    diagramMarginX: 50,
    diagramMarginY: 10,
    actorMargin: 50,
    width: 150,
    height: 65,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
    mirrorActors: true,
    bottomMarginAdj: 1,
    useMaxWidth: true
  },
  gantt: {
    titleTopMargin: 25,
    barHeight: 20,
    barGap: 4,
    topPadding: 50,
    leftPadding: 75,
    gridLineStartPadding: 35,
    fontSize: 11,
    fontFamily: '"Open-Sans", "sans-serif"',
    numberSectionStyles: 4,
    axisFormat: '%Y-%m-%d'
  }
})

// 这个方法要手动触发渲染不然会报错
const mermaided = (code: string, name: string): string => {
  let rendered = ''
  try {
    mermaid.mermaidAPI.render(name, code, (html) => {
      rendered = html
    })
  } catch(e) {
    rendered = `<p>${code}</p>`
  }
  return rendered
}

export default mermaided
