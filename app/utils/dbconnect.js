const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'hthoa137',
        database: 'JapTest'
    }
});
module.exports = knex;