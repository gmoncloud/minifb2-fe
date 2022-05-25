<template>
 <div class="container">
  <div class="about text-start">
    <h2>Friends</h2>
  </div>
    <div class="row" v-for="friend in friends" :key="friend.id">
      <div class="col-lg-12 text-start">
        <img :src="friend.profile_image" alt="post-image" height="80" width="80" />
        <h4>{{ friend.name }}</h4>
        <button type="button" class="btn btn-primary col-md-1" @click="unfriend(friend.id)">Unfriend</button>
      </div>
    </div>
 </div>

</template>
<script>
  import FriendService from '@/services/friend.service'
  export default {
    name: 'friend-page',
    components: {},
    data() {
        return {
          friends: [],
          user_id: localStorage.id,
          options: {
          headers: {
            'Content-Type': 'application/json', 
            'Authorization' : 'Bearer ' + localStorage.access_token
          }
        }
      }
    },
    methods: {
      async unfriend(friend_id) {
        await FriendService.delete(friend_id).then((response) => {
          this.friends = response.data.friends
        }).catch((error) => {
          console.log(error.response.data);
        })
      },
      async loadFriends() {
        await FriendService.getAll().then((response) => {
          this.friends = response.data.friends
        }).catch((error) => {
          console.log(error.response.data);
        })
      },
    },
    mounted() {
      this.loadFriends()
    }
  };
</script>