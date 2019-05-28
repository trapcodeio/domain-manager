class MainController extends $.controller {

    static dashboard(x) {
        // Get Current Auth User
        const user = x.authUser();

        // Set Data for vue to use.
        const appData = $.base64.encode({

            app: {
                env: $.env('NODE_ENV'),

                url: $.helpers.url(),

                name: $.helpers.config('name'),
            },

            user: user.jsJson()

        });

        // Render Dashboard and send appData
        return x.renderView('dashboard', {appData});
    }

    static vue(x){
        if(!x.isLogged()){
            return x.redirectToRoute('auth');
        }

        return MainController.dashboard(x);
    }
}

module.exports = MainController;