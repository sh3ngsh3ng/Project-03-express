const cartDataLayer = require("../dal/cart")


const displayCartItems = async (userId) => {
    return await cartDataLayer.getCartItems(userId)
}

const addToCart = async (userId, productSlotId, quantity) => {
    return await cartDataLayer.addCartItems(userId, productSlotId, quantity)
}

module.exports = {
    displayCartItems,
    addToCart
}