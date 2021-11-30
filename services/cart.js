const cartDataLayer = require("../dal/cart")


const displayCartItems = async (userId) => {
    return await cartDataLayer.getAllCartItems(userId)
}

const addToCart = async (userId, productSlotId) => {

    let cartItems = await cartDataLayer.getSpecificCartItems(userId, productSlotId)

    if (cartItems) {
        return await cartDataLayer.addOneCartItem(userId, productSlotId)
    } else {
        return await cartDataLayer.addCartItems(userId, productSlotId)
    }
    
}

const addOneQuantityToCart = async(userId, productSlotId) => {
    await cartDataLayer.addOneCartItem(userId, productSlotId)
}

const removeOneQuantityFromCart = async (userId, productSlotId) => {
    await cartDataLayer.removeOneQuantity(userId, productSlotId)
}

// cosnt clearAllCartItems

const deleteItemFromCart = async(userId, productSlotId) => {
    await cartDataLayer.deleteCartItem(userId, productSlotId)
}



module.exports = {
    displayCartItems,
    addToCart,
    deleteItemFromCart,
    removeOneQuantityFromCart,
    addOneQuantityToCart
}