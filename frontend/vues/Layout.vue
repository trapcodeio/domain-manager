<template>
    <section>
        <nav-bar></nav-bar>
    </section>
</template>

<script>
    import NavBar from './inc/NavBar';

    export default window.useVTP({
        vtp: {},

        components: {NavBar},

        mounted() {
            console.log('From APp.vue');
        }
    });
</script>