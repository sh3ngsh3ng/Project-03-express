const bookshelf = require("../bookshelf")

const Product = bookshelf.model('Product', {
    tableName: 'products',
    vendor() {
        return this.belongsTo('Vendor')
    },
    productslots() {
        return this.hasMany('ProductSlot')
    },
    tags() {
        return this.belongsToMany('Tag')
    }
})

const Tag = bookshelf.model('Tag', {
    tableName: 'tags',
    products() {
        return this.belongsToMany('Product')
    }
})

const ProductSlot = bookshelf.model('ProductSlot', {
    tableName: 'product_slots',
    product() {
        return this.belongsTo('Product')
    },
    cartitems(){
        return this.hasMany('CartItem')
    },
    orderitems() {
        return this.hasMany('OrderItem')
    }
})

const User = bookshelf.model('User', {
    tableName: 'users',
    cartitems () {
        return this.hasMany('CartItem')
    },
    orders() {
        return this.hasMany('Order')
    },
    orderitems() {
        return this.hasMany('OrderItem')
    }
})

const Vendor = bookshelf.model('Vendor', {
    tableName: 'vendors',
    products() {
        return this.hasMany('Product')
    },
    orderitems() {
        return this.hasMany('OrderItem')
    }
})

const OrderItem = bookshelf.model('OrderItem', {
    tableName: "order_items",
    productslot() {
        return this.belongsTo('ProductSlot', 'product_slots_id')
    },
    order() {
        return this.belongsTo('Order')
    },
    user() {
        return this.belongsTo('User')
    },
    vendor() {
        return this.belongsTo('Vendor')
    }
})

const CartItem = bookshelf.model('CartItem', {
    tableName: 'cart_items',
    productslot() {
        return this.belongsTo('ProductSlot', 'product_slots_id')
    },
    user() {
        return this.belongsTo('User')
    }
})



const Order = bookshelf.model("Order", {
    tableName: 'orders',
    user() {
        return this.belongsTo('User')
    }
})

module.exports = {Product, Tag, Vendor, User, CartItem, ProductSlot, OrderItem, Order}