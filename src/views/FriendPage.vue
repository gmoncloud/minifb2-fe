<template>
 <div class="container">
  <div class="about text-start">
    <h2>Friends</h2>
  </div>
    <div class="row" v-for="friend in friends" :key="friend.id">
      <div class="col-lg-12 text-start">
        <img v-if="friend.profile_image" :src="friend.profile_image" :alt="friend.name" height="80" width="80" />
        <img v-else :src="defaultImage" alt="no-image-available" height="80" width="80" />
        <h4>{{ friend.name }}</h4>
        <button type="button" class="btn btn-primary col-md-2" @click="unfriend(friend.id)">Unfriend</button>
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
  export default {
    name: 'friend-page',
    components: {},
    data() {
        return {
          moreExist: false,
          defaultImage: image,
					nextPage: 0,
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
          this.friends = response.data.friends.data
          if(response.data.friends.current_page < response.data.friends.last_page) {
            this.moreExist = true
            this.nextPage = response.data.friends.current_page + 1
          }else{
            this.moreExist = false
          }

        }).catch((error) => {
          console.log(error.response.data.friends);
        })
      },

      async loadMore() {
        await FriendService.loadMoreFriends(this.nextPage).then((response) => {
          if(response.data.friends.current_page < response.data.friends.last_page) {
            this.moreExist = true
            this.nextPage = response.data.friends.current_page + 1
          }else{
            this.moreExist = false
          }
          
          response.data.friends.data.forEach(data => {
            this.friends.push(data)
          });

        }).catch((error) => {
          console.log(error);
        })
      },

    },
    mounted() {
      this.loadFriends()
    }
  };
</script>