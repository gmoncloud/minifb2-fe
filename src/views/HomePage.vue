<template>
  <top-nav />
  <router-view></router-view>
  <router-view name="helper"></router-view>
</template>
<script>
  import TopNav from '@/components/Nav/TopNav.vue'
  import { createToaster } from "@meforma/vue-toaster";

  export default {
    name: 'home-page',
    components: {
      TopNav
    },
    mounted() {
      const toaster = createToaster({ /* options */ });
      toaster.show(`Hey! I'm here`);
    }
  };
</script>