<template>
<div class="container text-start">
  <div class="col-6">
    <form @submit.prevent="updateProfile">
      <div class="row mb-3">
        <label for="input-education" class="col-sm-3 col-form-label">Education</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" id="input-education" v-model="profile.education">
        </div>
      </div>
      <div class="row mb-3">
        <label for="input-current-city" class="col-sm-3 col-form-label">Current City</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" id="input-current-city" v-model="profile.current_city">
        </div>
      </div>
      <div class="row mb-3">
        <label for="input-hometown" class="col-sm-3 col-form-label">Home Town</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" id="input-hometown" v-model="profile.hometown">
        </div>
      </div>
      <div class="row mb-3">
        <label for="input-work" class="col-sm-3 col-form-label">Work</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" id="input-work" v-model="profile.work">
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  </div>
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
          user_id: localStorage.id,
          options: {
              headers: {
                'Content-Type': 'application/json', 
                'Authorization' : 'Bearer ' + localStorage.access_token
              }
            },
            profile: {
              education: '',
              current_city: '',
              hometown: '',
              work: ''
            }
        }
    },
    methods: {
      async updateProfile() {
        const url = process.env.VUE_APP_ROOT_API + '/v1/profile/' + this.user_id;
        this.success = false;
        this.error = null;

      try {
        const res = await axios.put(url, this.profile, this.options).then(res => res.data);
      
        if( typeof res.user === 'undefined' ) {
          console.log("Something went wrong!");
          return
        }

        this.success = true;
        this.$router.push({ name: 'Login' })
      
      } catch (err) {
        this.error = err.message;
      }
      },
      async loadProfile() {
          const id = localStorage.id
          //let response = await axios.get(process.env.VUE_APP_ROOT_API + '/v1/profile/' + this.$root.$route.params.id, options)
          let response = await axios.get(process.env.VUE_APP_ROOT_API + '/v1/profile/' + id, this.options)
          this.profile = response.data.profile
					console.log("res", response.data.profile)
      }
    },
    mounted() {
        this.loadProfile()
    }
  };
</script>