<template>
 <div class="container">
  <div class="about text-start">
    <h2>Friends</h2>
  </div>
    <div class="row" v-for="friend in friends" :key="friend.id">
      <div class="col-lg-12 text-start">
        <!-- <svg class="bd-placeholder-img rounded-circle" width="80" height="80" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg> -->
        <img :src="friend.profile_image" alt="post-image" height="80" width="80" />
        <h4>{{ friend.name }}</h4>
        <p><a class="btn btn-secondary" href="#">Unfriend</a></p>
      </div>
    </div>
 </div>

</template>
<script>
  import axios from 'axios'
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
      async loadFriends() {
        console.log("headers", this.options)
        let response = await axios.get(process.env.VUE_APP_ROOT_API + '/v1/friend/'+ this.user_id, this.options)
        this.friends = response.data.friends
        console.log('friends', this.friends)
      },
    },
    mounted() {
      this.loadFriends()
    }
  };
</script>