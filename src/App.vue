<template>
<main-header />
  
    <!-- <div id="nav">
      <router-link :to="{ name: 'Home' }">Home</router-link> |
      <router-link :to="{ name: 'About' }">About</router-link> |
      <router-link :to="{ name: 'Register' }">Register</router-link> |
      <router-link :to="{ name: 'Login' }">Login</router-link> 
    </div> -->
    <router-view />
  
<main-footer />
</template>

<style lang="scss">
  // #app {
  //   font-family: 'Avenir', Helvetica, Arial, sans-serif;
  //   -webkit-font-smoothing: antialiased;
  //   -moz-osx-font-smoothing: grayscale;
  //   text-align: center;
  //   color: #2c3e50;
  // }
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>

<script>
  import MainHeader from '@/components/Layouts/MainHeader.vue'
  import MainFooter from '@/components/Layouts/MainFooter.vue'

  export default {
    components: {
      MainHeader,
      MainFooter
    },
  };
</script>