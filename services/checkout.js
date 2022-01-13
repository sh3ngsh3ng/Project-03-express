const checkoutDataLayer = require("../dal/checkout")
const cartDataLayer = require("../dal/cart")
const ordersDataLayer = require("../dal/orders")

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

    await ordersDataLayer.createOrder(1)
    return
}


module.exports = {
    onCheckOut,
    validCheckOut
}
