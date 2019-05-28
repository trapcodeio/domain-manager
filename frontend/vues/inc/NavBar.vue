<template>
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item" href="https://bulma.io">
                    <h1 class="is-size-4">DomainManager</h1>
                </a>

                <a @click.prevent="toggleMenu" role="button" :class="burgerClass" aria-label="menu"
                   aria-expanded="false"
                   data-target="MainNavBar">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="MainNavBar" :class="mainClass">
                <div class="navbar-end">
                    <a class="navbar-item">
                        My Domains
                    </a>

                    <a class="navbar-item">
                        Settings
                    </a>

                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            {{user.name}}
                        </a>

                        <div class="navbar-dropdown">
                            <a class="navbar-item">
                                About
                            </a>
                            <a class="navbar-item">
                                Jobs
                            </a>
                            <a class="navbar-item">
                                Contact
                            </a>
                            <hr class="navbar-divider">
                            <a :href="$api.route('auth.logout')" class="navbar-item">
                                logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                mainClass: {
                    'navbar-menu': true,
                    'is-active': false
                },

                burgerClass: {
                    'navbar-burger': true,
                    'burger': true,
                    'is-active': false
                }
            }
        },
        methods: {
            toggleMenu() {
                this.mainClass['is-active'] = !this.mainClass['is-active'];
                this.burgerClass['is-active'] = !this.burgerClass['is-active'];
            }
        }
    }
</script>