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
    <div class="col-4">
      <img v-if="profile.profile_image" :src="profile.profile_image" :alt="profile.display_name" height="150" width="150" />
      <img v-else :src="defaultImage" alt="no-image-available" height="150" width="150" />
      <input type="file" class="form-control" @change="onChange">
        
      <div class="alert alert-danger" role="alert" v-if="errors && errors.profile_image">
        {{ errors.profile_image[0] }}
      </div>

  </div>
</div>
</div>
</template>

<script>
  import ProfileService from '@/services/profile.service'
  import image from '../../../onboarding-pro/src/assets/no-image-available.jpg'

  export default {
    name: 'profile-page',
		props: ['id'],
    data() {
        return {
          errors: {},
          isSuccessfulRequest: false,
          errorMessage: '',
          file: '',
          user_id: localStorage.id,
          defaultImage: image,
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
        const userID = this.user_id
        this.success = false;

        let data = new FormData()
        data.append('display_name', this.profile.display_name)
        data.append('profile_image', this.file)
        data.append('education', this.profile.education)
        data.append('current_city', this.profile.current_city)
        data.append('hometown', this.profile.hometown)
        data.append('work', this.profile.work)
        data.append('_method', 'PUT')

        await ProfileService.update(userID, data).then((response) => {
          this.profile = response.data.profile
          this.isSuccessfulRequest = true;
        }).catch((err) => {
          if (err.response.status == 422) {
              this.errors = err.response.data.errors;
          }
          console.log(err.response.data);
        })

      },
      async loadProfile() {
        await ProfileService.getAll().then((response) => {
          this.profile = response.data.profile
        }).catch((error) => {
          console.log(error.response.data);
        })
      },
    },
    mounted() {
      this.loadProfile()
    }
  };
</script>