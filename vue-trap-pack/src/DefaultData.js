let ng, vueEar, sh;
// Magic
ng = window.ng

if (window.hasOwnProperty('_____ComponentEngineStorage')) {
    sh = window._____ComponentEngineStorage
} else {
    if (typeof ng.s === 'function') {
        sh = ng.s();
    } else {
        sh = ng;
    }
}


vueEar = window.vueEar;

export default {
    data() {
        let d = {};
        if (typeof ng !== "undefined") {
            d['ng'] = ng
        }
        return d
    },

    computed: {
        pageEngine() {
            if (typeof ng === "undefined") {
                return 'user'
            }
            if (ng.config.engine === 'admin') {
                return 'admin'
            } else {
                return 'user'
            }
        },

        pageEngineIsAdmin() {
            return this.pageEngine === 'admin';
        }
    },

    methods: {
        talkTo(name, data = {}) {
            return vueEar.talkTo(name, data);
        },
        routerLink($name, $params = {}, $query = {}) {
            return {
                name: $name,
                params: $params,
                query: $query
            };
        },

        goBack(route, force = false) {
            window.history.length > 1 && !force
                ? this.$router.go(-1)
                : this.$router.push(route)
        },


        passThis(task, args = []) {
            return task(this);
        },

        getCache(key, $default = {}) {
            return sh.getComponentCache(key, $default);
        },
        setCache(key, value) {
            return sh.setComponentCache(key, value);
        },
        hasCache(key) {
            return sh.hasComponentCache(key);
        },

        _tk(name, data = {}) {
            return this.talkTo(name, data);
        },

        _rl($name, $params = {}, $query = {}) {
            return this.routerLink($name, $params, $query);
        },

        moment: window.moment || function () {
        },
    }
};
