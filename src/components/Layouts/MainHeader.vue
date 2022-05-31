<template>
  <div class="container-fluid header-box">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg>
        <span class="fs-4 brand-name">FBMini</span>
      </a>

      <ul class="nav nav-pills" v-if="isLoggedIn">
        <li class="nav-item">
          <span class="nav-link">Hi {{ username }}</span>
        </li>
        <li class="nav-item">
          <span class="nav-link" @click="doLogout">Logout</span>
        </li>
      </ul>

    </header>
  </div>
</template>

<style lang="scss" scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 .25rem rgba(255, 255, 255, .25);
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}

.header-box{
  background-color: #0d6efd;
  .brand-name{
    color: #ffffff;
    font-weight: bold;
  }
  span.nav-link {
    cursor: pointer;
    color: #ffffff;
  }
}

</style>

<script>
  export default {
    name: 'MainHeader',
    components: {},
    data(){
      return {
        isLoggedIn: false,
        username: ''
      }
    },
    methods: {
        getUsername(){
          this.username =  localStorage.username
        },
        checkIsLoggedIn(){
          this.isLoggedIn =  localStorage.id ? true : false
        },
        doLogout() {
            localStorage.clear()
            sessionStorage.clear();
            this.$router.push({name: 'Login'}); 
        }
    },
    mounted() {
      this.checkIsLoggedIn()
      this.getUsername()
    }
  };
</script>