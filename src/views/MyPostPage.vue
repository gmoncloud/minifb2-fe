<template>
  <div class="about">My Post Page</div>
  <user-post-list />
</template>
<script>
  import UserPostList from '@/components/Post/UserPostList.vue'
  export default {
    name: 'my-post-page',
    components: {UserPostList},
  };
</script>