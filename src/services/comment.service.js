import Axios from 'axios'
import Common from '@/common/http-common'

const RESOURCE_NAME = process.env.VUE_APP_ROOT_API + '/v1/comment'

export default {
    create(data) {
        return Axios.post(RESOURCE_NAME, data, Common.setHeaders());
    }
}