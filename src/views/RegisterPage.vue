<template>
  <div id="text-center">
    <main class="form-register">
      <form @submit="onSubmit">
        <h1 class="h3 mb-3 fw-normal">Create account</h1>

        <div class="form-floating">
          <input type="text" v-model="form.name" name="name" class="form-control" id="floatingInput" placeholder="name" required/>
          <label for="floatingInput">Full Name</label>
          
          <div class="alert alert-danger" role="alert" v-if="errors && errors.name">
            {{ errors.name[0] }}
          </div>
        </div>

        <div class="form-floating">
          <input type="text" v-model="form.email" name="email" class="form-control" id="floatingInput" placeholder="name@example.com" required/>
          <label for="floatingInput">Email address</label>

          <div class="alert alert-danger" role="alert" v-if="errors && errors.email">
            {{ errors.email[0] }}
          </div>
        </div>

        <div class="form-floating">
          <input type="password" v-model="form.password" name="password" class="form-control" id="floatingPassword" placeholder="Password" required/>
          <label for="floatingPassword">Password</label>

          <div class="alert alert-danger" role="alert" v-if="errors && errors.password">
            {{ errors.password[0] }}
          </div>
        </div>

        <div class="form-floating">
          <input type="password" v-model="form.password_confirmation" name="password_confirmation" class="form-control" id="floatingPassword" placeholder="Password" required/>
          <label for="floatingPassword">Confirm Password</label>

          <div class="alert alert-danger" role="alert" v-if="errors && errors.password">
            {{ errors.password[0] }}
          </div>
        </div>

        <div class="checkbox mb-3">
        </div>

        <button class="btn btn-lg btn-success" type="submit" @click="doCreateAccount">Create</button>

        <main-footer />
      
      </form>
    </main>
  </div>
</template>

<style lang="scss">
.form-register {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>

<script>
  import axios from 'axios'
  export default {
    name: 'registration-page',
    components: {
    },
    data() {
      return {
        errors: {},
        form: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        }
      }
    },
    methods: {
      onSubmit(e) {
        e.preventDefault()
        this.register(this.form)
      },
      
      async register(formData){
        const url = process.env.VUE_APP_ROOT_API + '/v1/register';
        this.success = false;
        this.error = null;

      try {
        const res = await axios.post(url, formData).then(res => res.data);
        this.errors = {};
      
        if( typeof res.user === 'undefined' ) {
          this.$router.push({ name: 'Login' })
          return
        }

        this.success = true;
        this.$router.push({ name: 'Login' })
      
      } catch (err) {
        this.error = err.message;

        if (err.response.status == 422) {
            this.errors = err.response.data.errors;
        }
        console.log('Error');

      }
      },
    },
  };
</script>