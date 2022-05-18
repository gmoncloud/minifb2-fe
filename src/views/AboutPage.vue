<template>
  <div class="about">About Page</div>

    <div id="nav">
      <router-link to="/about/contact">Contact</router-link> |
      <router-link to="/about/company">Company</router-link>
    </div>

  <router-view name="helper"></router-view>
</template>
<script>
  export default {
    name: 'about-pages',
    components: {},
  };
</script>