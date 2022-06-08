import Axios from 'axios'
import Common from '@/common/http-common'

const RESOURCE_NAME = process.env.VUE_APP_ROOT_API + '/v1/post'
const RESOURCE_NAME_USER_POSTS = process.env.VUE_APP_ROOT_API + '/v1/view-user-posts'
const USER_ID = localStorage.id

export default {
    getAllPosts() {
        return Axios.get(RESOURCE_NAME, Common.setHeaders());
    },

    getAllUserPosts() {
        return Axios.get(RESOURCE_NAME_USER_POSTS + '/' + USER_ID, Common.setHeaders());
    },

    delete(id) {
        return Axios.delete(RESOURCE_NAME + '/' + id, Common.setHeaders())
    },

    create(data) {
        return Axios.post(RESOURCE_NAME, data, Common.setHeaders());
    },

    getPostById(post_id) {
        return Axios.get(RESOURCE_NAME + '/' + post_id, Common.setHeaders());
    },

    update(post_id, data) {
        return Axios.post(RESOURCE_NAME + '/' + post_id, data, Common.setHeaders());
    },

    loadMorePosts(nextPage) {
        return Axios.get(RESOURCE_NAME + `?page=${nextPage}`, Common.setHeaders());
    },

    loadMoreUserPosts(nextPage) {
        return Axios.get(RESOURCE_NAME_USER_POSTS + '/' + USER_ID + `?page=${nextPage}`, Common.setHeaders());
    }
}