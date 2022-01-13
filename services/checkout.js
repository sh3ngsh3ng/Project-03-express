const checkoutDataLayer = require("../dal/checkout")
const cartDataLayer = require("../dal/cart")


const validCheckOut = async (productSlotId, checkOutQuantity) => {
    return await checkoutDataLayer.checkProductSlotsQuantity(productSlotId, checkOutQuantity)
}

// called when checkedout success (checkout.session.completed)
// orders will be array of objects, each object is a product slot
const onCheckOut = async(orders, userId) => {
    // update quantity slots
    await checkoutDataLayer.editProductSlotsQuantityOnCheckOut(orders)
    // update user's cart
    // await checkoutDataLayer.clearCartItemsOnCheckOut(orders, userId)
    await cartDataLayer.deleteCart(userId)
    return
}


module.exports = {
    onCheckOut,
    validCheckOut
}
