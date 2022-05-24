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
        <p><a class="btn btn-secondary" href="#" @click="addFriend(friend.id)">Add Friend</a></p>
      </div>
    </div>
 </div>

</template>
<script>
  import axios from 'axios'
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
        const formData = { user_id: localStorage.id, friend_id: friend_id };
        console.log("formData", formData);
        try {
          const res = await axios.post(process.env.VUE_APP_ROOT_API + '/v1/friend', formData, this.options).then(res => res.data);

          if( typeof res.friend === 'undefined' ) {
            console.log("Something went wrong!")
            return
          }

          this.success = true;
        
        } catch (err) {
          this.error = err.message;
        }

      },
      async loadFindFriends() {
        console.log("headers", this.options)
        let response = await axios.get(process.env.VUE_APP_ROOT_API + '/v1/find-friends/'+ this.user_id, this.options)
        this.friends = response.data.users
        console.log('friends', this.friends)
      },
    },
    mounted() {
      this.loadFindFriends()
    }
  };
</script>