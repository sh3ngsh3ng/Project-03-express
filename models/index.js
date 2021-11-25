const bookshelf = require("../bookshelf")

const Product = bookshelf.model('Product', {
    tableName: 'products',
    vendor() {
        return this.belongsTo('Vendors')
    }
})

const Vendor = bookshelf.model('Vendor', {
    tableName: 'vendors',
    products() {
        return this.hasMany('Product')
    }
})

module.exports = {Product, Vendor}