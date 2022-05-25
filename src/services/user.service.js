import Axios from 'axios'

const RESOURCE_NAME_LOGIN = process.env.VUE_APP_ROOT_API + '/v1/login'
const OPTIONS = {
  headers: {
    'Content-Type': 'multipart/form-data', 
    'Authorization' : 'Bearer ' + localStorage.access_token
  }
}

export default {
  login(data) {
    return Axios.post(RESOURCE_NAME_LOGIN, data, OPTIONS);
  }
}