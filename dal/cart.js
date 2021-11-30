const {CartItems} = require("../models")


const getCartItems = async(userId) => {
    return await CartItems.collection().where({
        "user_id": userId // change to user id for frontend
    }).fetch({
        require: false,
        withRelated: ['products_slots_id']
    })
}

const addCartItems = async(userId, productSlotId, quantity) => {
    let cartItem = new CartItems({
        'user_id': userId,
        'cart_items_quantity': quantity,
        'product_slots_id': productSlotId
    })
    await cartItem.save()
    return cartItem
}

module.exports = {getCartItems, addCartItems}