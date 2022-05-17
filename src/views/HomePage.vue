<template>
<main-header />
  
    <div id="nav">
      <router-link :to="{ name: 'Home' }">Home</router-link> |
      <router-link :to="{ name: 'About' }">About</router-link> |
      <router-link :to="{ name: 'Friend' }">Friends</router-link> |
      <router-link :to="{ name: 'Login' }">Login</router-link> 
    </div>
    <router-view />
  
<main-footer />
</template>
<script>
  export default {
    name: 'home-page',
    components: {
    },
  };
</script>