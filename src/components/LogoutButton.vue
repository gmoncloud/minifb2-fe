v-<template>
    <div>

    </div>
</template>

<style lang="scss" scoped>

</style>

<script>
    export default {
        name: 'logout-button',
        components: {   
        },
        methods: {
            doLogout() {
                localStorage.clear()
                sessionStorage.clear();
                this.$router.push({name: 'Login'}); 
            }
        }
    }
</script>