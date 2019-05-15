let xAuthController = require('@trapcode/xjs/engines/backend/controllers/AuthController');

class AuthController extends xAuthController {

    static middleware() {
        return {
            'auth.logged': 'dashboard',
            'auth.guest': ['index', 'login', 'register']
        }
    }

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
            return x.redirectToRoute('index');
        }

        return AuthController.dashboard(x);
    }
}

module.exports = AuthController;