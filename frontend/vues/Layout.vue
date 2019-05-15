<template>
    <section>
        <nav-bar></nav-bar>
        <section class="section mt-3 mt-lg-5">
            <div class="container">
                <div class="columns">
                    <div class="column is-4-desktop is-3-fullhd">
                        <side-bar></side-bar>
                    </div>
                    <div class="column is-8-desktop is-9-fullhd">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
    import NavBar from './inc/NavBar';
    import SideBar from './inc/SideBar';

    export default {
        components: {NavBar, SideBar}
    };
</script>