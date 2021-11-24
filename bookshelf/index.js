const knex = require('knex')({
    client: 'mysql',
    connection: {
        user: 'foo',
        password: 'bar',
        database: 'project03'
    }
})

const bookshelf = require('bookshelf')(knex)

module.exports = bookshelf