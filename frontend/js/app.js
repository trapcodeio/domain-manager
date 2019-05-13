import Layout from '../vues/Layout';

let Vue = window.Vue;

// Vue.use(VueTrapPack);

let Main = {
    vtp: {
        fetch: {
            route: 'index',
            data: {foo: 'bar'}
        }
    },
    render: h => h(Layout)
};

Main = useVTP(Main);

new Vue(Main).$mount('#app');