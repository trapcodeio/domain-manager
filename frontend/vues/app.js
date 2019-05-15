import router from './router';
import Layout from './Layout';

// For AutoComplete Sake
const Vue = window.Vue;

const Main = {
    router,
    render: h => h(Layout)
};

new Vue(Main).$mount('#app');