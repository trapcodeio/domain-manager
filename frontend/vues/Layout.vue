<template>
    <section>
        <nav-bar></nav-bar>
    </section>
</template>

<script>
    import NavBar from './inc/NavBar';

    export default window.vtpBuilder({
        vtp: {},

        components: {NavBar}
    });
</script>