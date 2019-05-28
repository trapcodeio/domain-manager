exports.up = function (knex) {
    return knex.schema.createTable('domains', function ($table) {
        $table.increments('id');
        $table.integer('user_id');
        $table.string('domain');
        $table.integer('group_id').nullable();
        $table.integer('registrar_account_id').nullable();
        $table.timestamp('created').nullable();
        $table.timestamp('updated').nullable();
        $table.timestamp('expires').nullable();
        $table.json('whois').nullable();
        $table.timestamps(true, true);
    })
};

exports.down = function (knex, Promise) {

};
