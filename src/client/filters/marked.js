import marked from 'marked'
import highlight from 'highlight.js'

// highlight.configure({
//   classPrefix: ''
// })
let renderer = new marked.Renderer()

marked.setOptions({
  renderer: renderer,
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
  highlight: function (code) {
    // highlight.initHighlightingOnLoad()
    return highlight.highlightAuto(code).value
  }
})

export default (str) => {
  return marked(str)
}
