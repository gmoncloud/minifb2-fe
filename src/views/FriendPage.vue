<template>
  <div class="about">Friends</div>
  <ul v-for="friend in friends" :key="friend.id">
    <li>{{ friend.name }}</li>
  </ul>

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