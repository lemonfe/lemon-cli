const createData = require('@/server/data/data.js')

const data = createData()

export default {
  getBlogDetail (id) {
    return data.getBlogDetail(id)
  }
}
