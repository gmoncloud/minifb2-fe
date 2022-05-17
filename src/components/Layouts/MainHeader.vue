<template>
  <div class="section-holder">
    <section class="text-start"><label for="mini-fb">FBMini</label></section>
    <section class="text-end">
        <label class="logout-btn" for="mini-fb" @click="doLogout">Logout</label>
    </section>
    <div class="float-none"></div>
  </div>
  <div class="text-center">
    <img class="mb-4" src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" alt="" width="300" height="100">
  </div>
</template>

<style lang="scss" scoped>
  section {
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 1.5;
      label {
        color: #fff;
        padding: 0 10px 0 10px;
      }
  }
  .logout-btn {
   &:hover {
     cursor: pointer;
    }
  }
</style>

<script>
  export default {
    name: 'MainHeader',
    components: {},
    methods: {
        doLogout() {
            localStorage.clear()
            sessionStorage.clear();
            this.$router.push({name: 'Login'}); 
        }
    },
  };
</script>