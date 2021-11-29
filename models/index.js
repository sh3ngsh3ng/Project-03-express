const bookshelf = require("../bookshelf")

const Product = bookshelf.model('Product', {
    tableName: 'products',
    vendor() {
        return this.belongsTo('Vendors')
    }
})

const ProductSlot = bookshelf.model('ProductSlot', {
    tableName: 'product_slots',
    product() {
        return this.belongsTo('Product')
    }
})

const Vendor = bookshelf.model('Vendor', {
    tableName: 'vendors',
    products() {
        return this.hasMany('Product')
    }
})

const User = bookshelf.model('Users', {
    tableName: 'users'
})

const Cart = bookshelf.model('Cart', {
    tableName: 'cart'
})

const CartItems = bookshelf.model('CartItems', {
    tableName: 'cart_items'
})



const OrderItem = bookshelf.model('OrderItem', {
    tableName: "order_items"
})

const Order = bookshelf.model("Order", {
    tableName: 'orders'
})

module.exports = {Product, Vendor, User, Cart, CartItems, ProductSlot, OrderItem, Order}