<template>
  <top-nav />
  <router-view></router-view>
  <router-view name="helper"></router-view>
</template>
<script>
  import TopNav from '@/components/Nav/TopNav.vue'

  export default {
    name: 'home-page',
    components: {
      TopNav
    },
    mounted() {
    }
  };
</script>