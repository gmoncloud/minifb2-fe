<template>
  <div class="about">My Post Page</div>
  <post-list />
</template>
<script>
  import PostList from '@/components/Post/PostList.vue'
  export default {
    name: 'my-post-page',
    components: {PostList},
  };
</script>