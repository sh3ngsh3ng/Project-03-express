const {CartItems} = require("../models")


const getCartItems = async(vendorId) => {
    return await CartItems.collection().where({
        "vendor_id": vendorId // change to user id for frontend
    }).fetch({
        require: false,
        withRelated: ['products_slots_id']
    })
}

const addCartItems = async(vendorId, productSlotId, quantity) => {
    let cartItem = new CartItems({
        'vendor_id': vendorId,
        'cart_items_quantity': quantity,
        'product_slots_id': productSlotId
    })
    await cartItem.save()
    return cartItem
}

module.exports = {getCartItems, addCartItems}