const axios = require('axios')
const marked = require('./marked.js')

const request = axios.create({
  baseURL: 'http://lemon.overape.com/api'
})

const createError = (code, resp) => {
  const error = new Error(resp.message)
  error.code = code
  return error
}

const handleRequest = ({status, data, ...rest}) => {
  if (status === 200) {
    return data
  } else {
    throw createError(status, rest)
  }
}

module.exports = () => {
  return {
    async getBlogDetail (id) {
      let detail = handleRequest(await request.get(`/blogs/${id}`))
      const {list, html} = marked(detail.content, detail.blog_type)
      detail.content = null
      detail.html = html
      detail.list = list
      return detail
    }
  }
}
