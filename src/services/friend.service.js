import Axios from 'axios'
import Common from '@/common/http-common'

const RESOURCE_NAME = process.env.VUE_APP_ROOT_API + '/v1/friend'
const RESOURCE_NAME_FIND_FRIENDS = process.env.VUE_APP_ROOT_API + '/v1/find-friends'
const USER_ID = localStorage.id

export default {
    getAll() {
        return Axios.get(RESOURCE_NAME + '/' + USER_ID, Common.setHeaders())
    },

    delete(friend_id) {
        return Axios.delete(RESOURCE_NAME + '/' + friend_id, Common.setHeaders())
    },

    findFriends() {
        return Axios.get(RESOURCE_NAME_FIND_FRIENDS + '/' + USER_ID, Common.setHeaders())
    },

    create(data) {
        return Axios.post(RESOURCE_NAME, data, Common.setHeaders())
    },

    loadMoreFriends(nextPage) {
        return Axios.get(RESOURCE_NAME + '/' + USER_ID + `?page=${nextPage}`, Common.setHeaders());
    },

    loadMoreFindFriends(nextPage) {
        return Axios.get(RESOURCE_NAME_FIND_FRIENDS + '/' + USER_ID + `?page=${nextPage}`, Common.setHeaders());
    },
}