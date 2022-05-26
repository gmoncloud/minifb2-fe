<template>
 <div class="container">
  <div class="about text-start">
    <h2>Find Friends</h2>
  </div>
    <div class="row" v-for="friend in friends" :key="friend.id">
      <div class="col-lg-12 text-start">
        <img v-if="friend.profile_image" :src="friend.profile_image" :alt="friend.name" height="80" width="80" />
        <img v-else :src="defaultImage" alt="no-image-available" height="50" width="50" />
        <h4>{{ friend.name }}</h4>
        <button type="button" class="btn btn-success col-md-2" @click="addFriend(friend.id)">Add Friend</button>
      </div>
    </div>
 </div>

</template>
<script>
  import FriendService from '@/services/friend.service'
  import image from '@/assets/no-image-available.jpg'
  export default {
    name: 'find-friend-page',
    components: {},
    data() {
        return {
          defaultImage: image,
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
      async addFriend(friend_id){
        const data = { user_id: localStorage.id, friend_id: friend_id };
        await FriendService.create(data).then((response) => {
          this.friends = response.data.users
        }).catch((error) => {
          console.log(error.response.data);
        })
      },
      async loadFindFriends() {
        await FriendService.findFriends().then((response) => {
          this.friends = response.data.users
        }).catch((error) => {
          console.log(error.response.data);
        })
      },
    },
    mounted() {
      this.loadFindFriends()
    }
  };
</script>