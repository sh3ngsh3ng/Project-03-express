const cartDataLayer = require("../dal/cart")


const displayCartItems = async (userId) => {
    return await cartDataLayer.getAllCartItems(userId)
}

const addToCart = async (userId, productSlotId) => {

    let cartItems = await cartDataLayer.getSpecificCartItems(userId, productSlotId)

    if (cartItems) {
        return await cartDataLayer.addOneQuantity(userId, productSlotId)
    } else {
        return await cartDataLayer.addCartItems(userId, productSlotId)
    }
    
}

const addOneQuantityToCart = async(userId, productSlotId) => {
    await cartDataLayer.addOneQuantity(userId, productSlotId)
}

const removeOneQuantityFromCart = async (userId, productSlotId) => {
    await cartDataLayer.removeOneQuantity(userId, productSlotId)
}

const deleteCart = async (userId) => {
    await cartDataLayer.deleteCart(userId)
}

const deleteItemFromCart = async(userId, productSlotId) => {
    await cartDataLayer.deleteCartItem(userId, productSlotId)
}



module.exports = {
    displayCartItems,
    addToCart,
    deleteItemFromCart,
    deleteCart,
    removeOneQuantityFromCart,
    addOneQuantityToCart
}