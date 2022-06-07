<template>
  <div id="text-center">

    <div v-if="message"
         :class="[isSuccessfulRequest ? 'alert alert-success' : 'alert alert-danger']"
         class="px-4 py-3 rounded relative p-3 my-2"
         role="alert">
      <strong class="font-bold">{{ isSuccessfulRequest ? 'Success! ' : 'An error occurred: ' }}</strong>
      <span class="sm:inline">{{ message }}</span>
    </div>

    <main class="form-register">
      <form @submit.prevent="onSubmit">
        <h1 class="h3 mb-3 fw-normal">Create account</h1>

        <div class="form-floating">
          <input type="text" v-model="form.name" name="name" class="form-control" id="floatingInputName" placeholder="name" />
          <label for="floatingInputName">Full Name</label>
          
          <div class="alert alert-danger" role="alert" v-if="errors && errors.name">
            {{ errors.name[0] }}
          </div>
        </div>

        <div class="form-floating">
          <input type="text" v-model="form.email" name="email" class="form-control" id="floatingInputEmail" placeholder="name@example.com" />
          <label for="floatingInputEmail">Email address</label>

          <div class="alert alert-danger" role="alert" v-if="errors && errors.email">
            {{ errors.email[0] }}
          </div>
        </div>

        <div class="form-floating">
          <input type="password" v-model="form.password" name="password" class="form-control" id="password" placeholder="Password" />
          <label for="floatingPassword">Password</label>

          <div class="alert alert-danger" role="alert" v-if="errors && errors.password">
            {{ errors.password[0] }}
          </div>
        </div>

        <div class="form-floating">
          <input type="password" v-model="form.password_confirmation" name="password_confirmation" class="form-control" id="confirmationPassword" placeholder="Password" />
          <label for="floatingConfirmationPassword">Confirm Password</label>

          <div class="alert alert-danger" role="alert" v-if="errors && errors.password">
            {{ errors.password[0] }}
          </div>
        </div>

        <div class="checkbox mb-3">
        </div>

        <button class="btn btn-lg btn-success" type="submit" @click="doCreateAccount">Create</button>      
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
  import UserService from '@/services/user.service'
  import { createToaster } from "@meforma/vue-toaster"
  const toaster = createToaster({ /* options */ })
  export default {
    name: 'registration-page',
    data() {
      return {
        errors: {},
        isSuccessfulRequest: false,
        form: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        }
      }
    },
    methods: {
      async onSubmit() {
        await UserService.register(this.form).then((res) => {
        this.errors = {};

        if( typeof res.data.user === 'undefined' ) {
          this.$router.push({ name: 'Login' })
          return
        }

          this.isSuccessfulRequest = true;
          this.message = 'Account successfully created';
          setTimeout(function () {
            this.$router.push({name: 'Login'})
          }, 2000)

          this.$router.push({name: 'Login'})

        }).catch((error) => {
          if (error.response.status == 422) {
              this.errors = error.response.data.errors;
          }

          this.message = (error.response && error.response.data && error.response.data.message) || error.message;
          toaster.show(this.message);
        })
      },
    },
  };
</script>