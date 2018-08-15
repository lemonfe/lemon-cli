// import clientModel from '../../model/client-model.js'
import serverModel from 'model'

const handleError = (err) => {
  console.log(err)
}

export default {
  fetchBlogDetail ({commit}, {id}) {
    return serverModel.getBlogDetail(id)
      .then(data => {
        commit('fillBlogDetail', data)
      })
      .catch(err => {
        handleError(err)
      })
  }
}
