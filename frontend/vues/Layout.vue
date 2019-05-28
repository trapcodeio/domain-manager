<template>
    <section>
        <nav-bar></nav-bar>
        <section class="section">
            <div class="container">
                <div class="columns">
                    <div class="column is-4-tablet is-3-desktop">
                        <div class="is-hidden-tablet">
                            <button @click.prevent="toggleSideMenu" class="button is-outlined is-dark">
                                {{menuIsOpen?'Close Menu': 'Open Menu'}}
                            </button>
                        </div>

                        <side-bar :class="sidebarClass"></side-bar>
                    </div>
                    <div class="column is-8-desktop is-3-desktop">
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
        components: {NavBar, SideBar},
        data() {
            return {
                sidebarClass: {
                    'pt-3': true,
                    'pt-md-0': true,
                    'is-hidden-mobile': true
                }
            }
        },

        watch: {
            '$route.name': function () {
                if (this.menuIsOpen) {
                    this.closeSideBar();
                }
            }
        },

        computed: {
            menuIsOpen() {
                return this.sidebarClass['is-hidden-mobile'] === false;
            }
        },

        methods: {
            closeSideBar() {
                this.sidebarClass['is-hidden-mobile'] = true
            },

            toggleSideMenu() {
                this.sidebarClass['is-hidden-mobile'] = !this.sidebarClass['is-hidden-mobile'];
            }
        }
    };
</script>