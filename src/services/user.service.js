import Axios from 'axios'
import Common from '@/common/http-common'

const RESOURCE_NAME_LOGIN = process.env.VUE_APP_ROOT_API + '/v1/login'
const RESOURCE_NAME_REGISTER = process.env.VUE_APP_ROOT_API + '/v1/register'

export default {
    login(data) {
        return Axios.post(RESOURCE_NAME_LOGIN, data, Common.setHeaders());
    },

    register(data) {
        return Axios.post(RESOURCE_NAME_REGISTER, data, Common.setHeaders());
    }
}