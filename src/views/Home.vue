<template>
  <div class="home">Home Page</div>

  <div id="app">
  <div id="nav">
    <router-link :to="{ name: 'Home' }">Home</router-link> |
    <router-link :to="{ name: 'Profile' }">Profile</router-link> |
    <router-link :to="{ name: 'Register' }">Friends</router-link> |
    <router-link :to="{ name: 'Login' }">Logout</router-link> 
  </div>

  <router-view />
  </div>
  
</template>
<script>
  export default {
    name: 'home-page',
    components: {},
  };
</script>