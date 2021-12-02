const checkoutDataLayer = require("../dal/checkout")


// orders will be array of objects
const onCheckOut = async(orders, userId) => {
    // update quantity slots
    await checkoutDataLayer.editProductSlotsQuantityOnCheckOut(orders)
    // update user's cart
    await checkoutDataLayer.clearCartItemsOnCheckOut(orders, userId)
    return
}


module.exports = {
    onCheckOut
}
