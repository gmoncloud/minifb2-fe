<template>
    <div v-if="profile">
			<img :src="profile.profile_url" style="width:100%;" alt="">
      <h3>Education: {{ profile.education }}</h3>
      <h3>Current City: {{ profile.current_city }}</h3>
			<h3>Homtetown: {{ profile.hometown }}</h3>
      <h3>Work: {{ profile.work }}</h3>
    </div>
		<div v-else>
			<p>loading profile details...</p>
		</div>
</template>

<script>
  import axios from 'axios'
  
  export default {
    name: 'profile-page',
    components: {},
		props: ['id'],
    data() {
        return {
            profile: null
        }
    },
    methods: {
      async loadProfile() {
          const access_token = localStorage.access_token
          const options = {
            headers: {
              'Content-Type': 'application/json', 
              'Authorization' : 'Bearer ' + access_token}
          };
          let response = await axios.get(process.env.VUE_APP_ROOT_API + '/v1/profile/1', options)
          this.profile = response.data.profile
					console.log("res", response.data.profile)
      }
    },
    mounted() {
        this.loadProfile()
    }
  };
</script>