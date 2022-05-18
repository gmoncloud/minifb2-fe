<template>
 <div class="container">
  <div class="about text-start">
    <h2>Find Friends</h2>
  </div>
    <div class="row" v-for="friend in friends" :key="friend.id">
      <div class="col-lg-12 text-start">
        <svg class="bd-placeholder-img rounded-circle" width="80" height="80" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>

        <h4>{{ friend.name }}</h4>
        <p><a class="btn btn-secondary" href="#" @click="addFriend(friend.id)">Add Friend</a></p>
      </div>
    </div>
 </div>

</template>
<script>
  import axios from 'axios'
  export default {
    name: 'find-friend-page',
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