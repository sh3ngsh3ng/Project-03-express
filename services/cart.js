const cartDataLayer = require("../dal/cart")


const displayCartItems = async (userId) => {
    return await cartDataLayer.getAllCartItems(userId)
}

const addToCart = async (userId, productSlotId) => {

    let cartItems = await cartDataLayer.getSpecificCartItems(userId, productSlotId)

    if (cartItems) {
        return await cartDataLayer.plusOneCartItem(userId, productSlotId)
    } else {
        return await cartDataLayer.addCartItems(userId, productSlotId)
    }
    
}

module.exports = {
    displayCartItems,
    addToCart
}