<template>
  <div id="text-center">
    <main class="form-signin">
      <form @submit.prevent="onSubmit">
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

        <div class="alert alert-danger" role="alert" v-if="errorMessage">
          {{ errorMessage }}
        </div>

        <div class="form-floating">
          <input type="text" v-model="email" name="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
          <label for="floatingInput">Email address</label>

          <div class="alert alert-danger" role="alert" v-if="errors && errors.email">
            {{ errors.email[0] }}
          </div>
        </div>
        
        <div class="form-floating">
          <input type="password" v-model="password" name="password" class="form-control" id="floatingPassword" placeholder="Password"/>
          <label for="floatingPassword">Password</label>

          <div class="alert alert-danger" role="alert" v-if="errors && errors.password">
            {{ errors.password[0] }}
          </div>
        </div>

        <div class="checkbox mb-3">
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit" @click="doLogin">Sign in</button>

        <hr>

        <button class="btn btn-lg btn-success" type="submit" @click="doCreateAccount">Create a new account</button>      
      </form>
    </main>
  </div>
</template>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>

<script>
  import UserService from '@/services/user.service'
  export default {
    name: 'login-page',
    components: {
    },
    data() {
        return {
          errors: {},
          errorMessage: '',
          email: '',
          password: '',
          error: null,
          success: false
        }
    },
    methods: {
      async onSubmit() {
        const data = { email: this.email, password: this.password};
        await UserService.login(data).then((res) => {

         if(res.data.error_message) {
            this.errorMessage = res.data.error_message
            return
          }

          localStorage.setItem("id", res.data.user.id);
          localStorage.setItem("username", res.data.user.name);
          localStorage.setItem("access_token", res.data.access_token);
          this.$router.push({ name: 'Home', params: { id: res.data.user.id } })

        }).catch((err) => {
          if (err.res.status == 422) {
              this.errors = err.response.data.errors;
          }
          console.log('Error');
        })
      },
      
      doCreateAccount() {
        this.$router.push({name: 'Register'}); 
      }
    }
  };
</script>