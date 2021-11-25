const bookshelf = require("../bookshelf")

const Product = bookshelf.model('Product', {
    tableName: 'products'
})

const Vendors = bookshelf.model('Vendors', {
    tableName: 'vendors'
})

module.exports = {Product, Vendors}