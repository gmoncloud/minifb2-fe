<template>
  <div class="container">
    <div class="about text-start">
      <h2>Find Friends</h2>
    </div>
    <div class="row" v-for="friend in friends" :key="friend.id">
      <div class="col-lg-12 text-start">
        <img v-if="friend.profile_image" :src="friend.profile_image" :alt="friend.name" height="80" width="80"/>
        <img v-else :src="defaultImage" alt="no-image-available" height="50" width="50"/>
        <h4>{{ friend.name }}</h4>
        <button type="button" class="btn btn-success col-md-2" @click="addFriend(friend.id)">Add Friend</button>
      </div>
    </div>
    <div class="row">
      <div class="text-center" v-show="moreExist">
        <button type="button" class="btn btn-primary btn-sm col-3" @click="loadMore()">Load More</button>
      </div>
    </div>
  </div>

</template>
<script>
import FriendService from '@/services/friend.service'
import image from '@/assets/no-image-available.jpg'
import {createToaster} from "@meforma/vue-toaster"

const toaster = createToaster({ /* options */})
export default {
  name: 'find-friend-page',
  data() {
    return {
      isSuccessfulRequest: false,
      moreExist: false,
      nextPage: 0,
      defaultImage: image,
      friends: [],
      user_id: localStorage.id,
    }
  },
  methods: {
    async addFriend(friend_id) {
      const data = {user_id: localStorage.id, friend_id: friend_id};
      await FriendService.create(data).then((response) => {
        this.friends = response.data.users
      }).catch((error) => {
        this.message = (error.response && error.response.data && error.response.data.message) || error.message;
        toaster.show(this.message);
      })
    },

    async loadFindFriends() {
      await FriendService.findFriends().then((response) => {
        this.friends = response.data.users.data
        if (response.data.users.current_page < response.data.users.last_page) {
          this.moreExist = true
          this.nextPage = response.data.users.current_page + 1
        } else {
          this.moreExist = false
        }

      }).catch((error) => {
        this.message = (error.response && error.response.data && error.response.data.message) || error.message;
        toaster.show(this.message);
      })
    },

    async loadMore() {
      await FriendService.loadMoreFindFriends(this.nextPage).then((response) => {
        if (response.data.users.current_page < response.data.users.last_page) {
          this.moreExist = true
          this.nextPage = response.data.users.current_page + 1
        } else {
          this.moreExist = false
        }

        response.data.users.data.forEach(data => {
          this.friends.push(data)
        });

      }).catch((error) => {
        this.message = (error.response && error.response.data && error.response.data.message) || error.message;
        toaster.show(this.message);
      })
    },
  },
  mounted() {
    this.loadFindFriends()
  }
};
</script>