/**
* Domain Model
* @class
* @extends $.model
*/
class Domain extends $.model {

    /**
    * Name of model database table name.
    * @method tableName
    * @returns {string}
    */
    static get tableName() {
        return "domains";
    }

}

Domain.prototype.$hidden = [];

module.exports = Domain;