<template>
<div class="container text-start">
  <div class="row">
    <div class="col-6">
      <form @submit.prevent="updateProfile" enctype="multipart/form-data">
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
      <input type="file" class="form-control" @change="onChange">

      <!-- <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      <button v-on:click="submitFile()">Submit</button> -->

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
          file: '',
          user_id: localStorage.id,
          defaultImage: image,
          options: {
              headers: {
                'Content-Type': 'application/json', 
                'Authorization' : 'Bearer ' + localStorage.access_token
              }
            },
            optionImage: {
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

      onChange(e) {
        this.file = e.target.files[0];
        console.log(this.file)
      },
      async updateProfile() {
        const url = process.env.VUE_APP_ROOT_API + '/v1/profile/' + this.user_id;
        this.success = false;
        this.error = null;
        try {
          let data = new FormData()
          data.append('display_name', this.profile.display_name)
          data.append('profile_image', this.file)
          data.append('education', this.profile.education)
          data.append('current_city', this.profile.current_city)
          data.append('hometown', this.profile.hometown)
          data.append('work', this.profile.work)
          data.append('_method', 'PUT')


          const res = await axios.post(url, data, this.optionImage).then(res => res.data);
        
          if( typeof res.profile === 'undefined' ) {
            console.log("Something went wrong!");
            return
          }

          this.success = true;
        
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