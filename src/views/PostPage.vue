<template>
  <div class="about">Post Page</div>
  <post-list />
</template>
<script>
  import PostList from '@/components/Post/PostList.vue'
  export default {
    name: 'post-page',
    components: {PostList},
  };
</script>