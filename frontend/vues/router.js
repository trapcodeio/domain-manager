import Domains from './pages/Domains';
import Settings from './pages/Settings';

const RouterViewComponent = {
    template: '<router-view></router-view>'
};


export default new window.VueRouter({
    mode: 'history',
    base: '/',
    linkActiveClass: 'is-active',
    routes: [
        {
            path: '/dashboard',
            name: 'domains',
            component: Domains
        },

        {
            path: '/settings',
            name: 'settings',
            component: Settings
        },

        /*{
            path: '/users',
            // name: 'users',
            component: RouterViewComponent,
            children: [
                {
                    path: '',
                    name: 'users',
                    component: Users
                },
                {
                    path: ':id',
                    name: 'user',
                    component: Profile
                },
                {
                    path: ':id/events',
                    name: 'events',
                    component: UserEvents
                }
            ]
        },

        {
            path: '/invite',
            name: 'invite',
            component: Invite
        },

        {
            path: '/plans',
            name: 'plans',
            component: Plans
        },*/

        /*{
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/!* webpackChunkName: "about" *!/ './views/About.vue')
        }*/
    ]
});