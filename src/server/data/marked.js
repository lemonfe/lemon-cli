const marked = require('marked')
const highlight = require('highlight.js/lib/highlight')
const md5 = require('blueimp-md5')

const createList = (str) => {
  const reg = /.*#{2,3} (.*)\r\n/gi
  const replace = /#/gi
  const s = str.match(reg)
  const list = []
  if (s) {
    for (let i of s) {
      let innerText = i.replace(replace, '').replace(/(^\s*)|(\s*$)/g, '')
      let id = i.indexOf('###') !== -1 ? 'h3-' + md5(innerText) : 'h2-' + md5(innerText)
      list.push({
        innerText,
        id
      })
    }
  }
  return list
}

let renderer = new marked.Renderer()

renderer.heading = function (text, level) {
  let id
  if (level === 2 || level === 3) {
    id = md5(text.replace(/(^\s*)|(\s*$)/g, ''))
    return `<h${level} id='h${level}-${id}' class="article-catalog-item md-h${level}">${text}</h${level}>`
  }
  return `<h${level}>${text}</h${level}>`
}

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
    return highlight.highlightAuto(code).value
  }
})

module.exports = (str) => {
  return {
    list: createList(str),
    html: marked(str)
  }
}
