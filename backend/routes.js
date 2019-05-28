const Route = $.router;

const DomainsRoutes = () => {
    Route.get('', 'index');
    Route.post('', 'store');

    Route
        .path(':domain', () => {

            Route.get('', 'view').name('view')

        }).as('.domain')
};

Route.path('/api', () => {

    Route.path('domains', DomainsRoutes)
        .controller('Domain', true)
        .as('domains');

}).as('api');

Route.routesAfterPlugins = function () {
    Route.path('/app', () => {
        Route.get('', 'Main@vue').name('dashboard');
        Route.get('*', 'Main@vue')
    }).controller('Main')
};