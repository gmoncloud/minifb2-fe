<template>
<div class="container text-start">
  <div class="row">
    <div class="col-6">
      <form @submit.prevent="updateProfile">
        <div class="row mb-3">
          <label for="input-display-name" class="col-sm-3 col-form-label">Display Name</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" id="input-display-name" v-model="profile.display_name">
          </div>
        </div>
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
    <div class="col-6">
      <img v-if="profile.profile_image" :src="profile.profile_image" :alt="profile.display_name" height="150" width="150" />
      <img v-else :src="defaultImage" alt="no-image-available" height="150" width="150" />
      <input type="file" @input="selectFile">
  </div>
</div>
</div>
</template>

<script>
  import axios from 'axios'
  import image from '@/assets/no-image-available.jpg'

  export default {
    name: 'profile-page',
    components: {},
		props: ['id'],
    data() {
        return {
          user_id: localStorage.id,
          defaultImage: image,
          options: {
              headers: {
                'Content-Type': 'application/json', 
                'Authorization' : 'Bearer ' + localStorage.access_token
              }
            },
            optionsImage: {
              headers: {
                'Content-Type': 'multipart/form-data', 
                'Authorization' : 'Bearer ' + localStorage.access_token
              }
            },
            profile: {
              display_name: '',
              profile_image: '',
              education: '',
              current_city: '',
              hometown: '',
              work: '',
              _method: 'PUT'
            }
        }
    },
    methods: {
      selectFile() {
        
      },
      async updateProfile() {
        const url = process.env.VUE_APP_ROOT_API + '/v1/profile/' + this.user_id;
        this.success = false;
        this.error = null;

      try {
        const res = await axios.post(url, this.profile, this.optionsImage).then(res => res.data);
      
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