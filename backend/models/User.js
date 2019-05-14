class User extends $.model {
    static get tableName() {
        return 'users';
    }

    jsJson(){
        return this.$omit([
            'is_manager',
            'updated_at',
            'created_at'
        ]);
    }
}

User.prototype.$hidden = [
    'password'
];


module.exports = User;