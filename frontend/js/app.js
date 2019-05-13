import Layout from '../vues/Layout';

// For AutoComplete Sake
const Vue = window.Vue;

const Main = {
    render: h => h(Layout)
};

new Vue(Main).$mount('#app');