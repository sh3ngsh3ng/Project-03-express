const {ProductSlot} = require("../models")

// can only check out if slots quantity > checkout quantity
const checkProductSlotsQuantity = async (productSlotId, checkOutQuantity) => {
    let slot = await ProductSlot.where({
        "id": productSlotId
    }).fetch({
        require: false
    })
    let slotQuantity = slot.get("slot_quantity")
    if (slotQuantity - checkOutQuantity < 0) {
        return false
    } else {
        return true
    } 
}

const editProductSlotsQuantityOnCheckOut = async(orders) => {
    // minus productslot quantity
    for (let i = 0; i < orders.length; i++) {
        let productId = orders[i].product_id
        let orderedQuantity = orders[i].quantity
        let productSlot = await ProductSlot.where({'product_id': productId}).fetch({
            require: false
        })

        productSlot.set("slot_quantity", (productSlot.get('slot_quantity') - orderedQuantity))
        await productSlot.save()
    }
}


// add multiple select for checkout (in progress)
// const clearCartItemsOnCheckOut = async (orders, userId) => {

//     await CartItem.collection().where({
//         "user_id": userId,
//     }).fetch().then((CartItem) => {
//         CartItem.forEach(function(items) {
//             items.destroy()
//         })
//     })
// }


module.exports = {
    editProductSlotsQuantityOnCheckOut,
    checkProductSlotsQuantity
}