const checkoutDataLayer = require("../dal/checkout")
const cartDataLayer = require("../dal/cart")
const ordersDataLayer = require("../dal/orders")

const validCheckOut = async (productSlotId, checkOutQuantity) => {
    return await checkoutDataLayer.checkProductSlotsQuantity(productSlotId, checkOutQuantity)
}

// called when checkedout success (checkout.session.completed)
// orders will be array of objects, each object is a product slot
const onCheckOut = async(orders, userId, totalCost) => {

    // update quantity slots
    await checkoutDataLayer.editProductSlotsQuantityOnCheckOut(orders)
    console.log("1 pass")
    // update user's cart
    await cartDataLayer.deleteCart(userId)
    console.log("2 pass")
    // create user's order
    let newOrder = await ordersDataLayer.createOrder(userId, totalCost) // newOrder is the new row created in orders table
    console.log("newOrder =>", newOrder)
    console.log("3 pass")
    // create order items
    await ordersDataLayer.createOrderItems(orders, newOrder)
    console.log("4 pass") 
    return
}


module.exports = {
    onCheckOut,
    validCheckOut
}
