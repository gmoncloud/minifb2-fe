<template>
  <div id="text-center">
    <main class="form-signin">
      <form @submit="onSubmit">
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

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

        <main-footer />
      
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
            email: '',
            password: '',
            error: null,
            success: false
        }
    },
    methods: {
      onSubmit(e) {
        e.preventDefault()
  
        const newData = {
          id: Math.floor(Math.random() * 100000),
          email: this.email,
          password: this.password
        }
        this.login(newData.email, newData.password)
      },
      async login(){
          const auth = { email: this.email, password: this.password };
          const url = process.env.VUE_APP_ROOT_API + '/v1/login';
          this.success = false;
          this.error = null;

        try {
          const res = await axios.post(url, auth).then(res => res.data);
        
          if( typeof res.user === 'undefined' ) {
            this.$router.push({ name: 'Login' })
            return
          }

          this.success = true;
          localStorage.setItem("id", res.user.id);
          localStorage.setItem("access_token", res.access_token);

          //this.$router.push({ name: 'Profile', params: { id: res.user.id } })
         this.$router.push({ name: 'Home', params: { id: res.user.id } })
        
        } catch (err) {
          this.error = err.message;
        }


      },

      doCreateAccount() {
        this.$router.push({name: 'Register'}); 
      },
      
      async loadPosts() {
          const access_token = localStorage.access_token
          const options = {
            headers: {
              'Content-Type': 'application/json', 
              'Authorization' : 'Bearer ' + access_token}
          };
          let response = await axios.get(process.env.VUE_APP_ROOT_API + '/v1/profile/1', options)
          this.posts = response.data
          console.log("loadPost: ", this.posts);
      }
    }
  };
</script>