/**
 * DomainController
 * @class
 * @extends $.controller
 */
class DomainController extends $.controller {

    /**
     * middleware - Set Middleware
     * @returns {Object}
     */
    static middleware() {
        return {}
    }


    index(x) {
        x.toApi({
            foo: 'bar'
        })
    }

}


module.exports = DomainController;