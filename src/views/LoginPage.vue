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
        </div>
        
        <div class="form-floating">
          <input type="password" v-model="password" name="password" class="form-control" id="floatingPassword" placeholder="Password"/>
          <label for="floatingPassword">Password</label>
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
  import axios from 'axios'
  export default {
    name: 'login-page',
    components: {
    },
    data() {
        return {
            errorMessage: '',
            email: '',
            password: '',
            error: null,
            success: false
        }
    },
    methods: {
      async onSubmit() {  
        const auth = {
          email: this.email,
          password: this.password
        }
  
          const url = process.env.VUE_APP_ROOT_API + '/v1/login';
          this.success = false;
          this.error = null;

        try {
          const res = await axios.post(url, auth).then(res => res.data);
        
          if(res.error_message) {
            this.errorMessage = res.error_message
            return
          }

          this.success = true;
          localStorage.setItem("id", res.user.id);
          localStorage.setItem("username", res.user.name);
          localStorage.setItem("access_token", res.access_token);

          //this.$router.push({ name: 'Profile', params: { id: res.user.id } })
         this.$router.push({ name: 'Home', params: { id: res.user.id } })
        
        } catch (err) {
          this.error = err.message
        }

      },
      
      doCreateAccount() {
        this.$router.push({name: 'Register'}); 
      }
    }
  };
</script>