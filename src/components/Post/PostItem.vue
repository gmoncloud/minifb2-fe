<template>
    <div>
        <p>{{ written_text }}</p>
    </div>
</template>

<style scoped>

</style>

<script>
    export default {
        name: 'post-item',
        components: {
        },
        props: ['written_text']
    }
</script>

