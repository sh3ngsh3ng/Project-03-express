const knex = require('knex')({
    client: 'mysql',
    connection: {
        "user": 'foo',
        "password": 'bar',
        "database": 'project03'
        // "host": process.env.DB_HOST,
        // "ssl": {
        //     "rejectUnauthorized": false
        // }
    }
})

const bookshelf = require('bookshelf')(knex)

module.exports = bookshelf