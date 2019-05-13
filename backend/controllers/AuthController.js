let xAuthController = $.engine('backend/controllers/AuthController', true);

class AuthController extends xAuthController {
    // Your Functions Here!
    dashboard(x) {
        const user = x.authUser();

        return x.renderView('dashboard', {
            userJson: JSON.stringify(user, null, 2)
        });
    }
}

module.exports = AuthController;