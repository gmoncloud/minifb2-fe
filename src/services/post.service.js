import Axios from 'axios'

const RESOURCE_NAME = process.env.VUE_APP_ROOT_API + '/v1/post'
const OPTIONS = {
  headers: {
    'Content-Type': 'multipart/form-data', 
    'Authorization' : 'Bearer ' + localStorage.access_token
  }
}

export default {
  getAll() {
    return Axios.get(RESOURCE_NAME, OPTIONS);
  },

  delete(id) {
    return Axios.delete(RESOURCE_NAME + '/' + id, OPTIONS)
  },

  create(data) {
    return Axios.post(RESOURCE_NAME, data, OPTIONS);
  },

  getPostById(post_id) {
    return Axios.get(RESOURCE_NAME + '/' + post_id, OPTIONS);
  },

  update(post_id, data) {
    return Axios.post(RESOURCE_NAME + '/' + post_id, data, OPTIONS);
  },

  loadMore(nextPage) {
    return Axios.get(RESOURCE_NAME + `?page=${nextPage}`, OPTIONS);
  }
}