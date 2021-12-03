const {CartItem} = require("../models")


const getAllCartItems = async(userId) => {
    return await CartItem.where({
        "user_id": userId // change to user id for frontend
    }).fetchAll({
        require: false,
        withRelated: ["productslot", "productslot.product"]
    })
    
}

const getSpecificCartItems = async (userId, productSlotId) => {
    return await CartItem.where({
        'user_id': userId,
        'product_slots_id': productSlotId
    }).fetch({
        require: false
    })
}

const addCartItems = async(userId, productSlotId) => {

    let cartItem = new CartItem({
        'user_id': userId,
        'cart_items_quantity': 1,
        'product_slots_id': productSlotId
    })
    await cartItem.save()
    return cartItem
}

const deleteCartItem = async (userId, productSlotId) => {
    let cartItem = await getSpecificCartItems(userId, productSlotId)

    if (cartItem) {
        await cartItem.destroy()
        console.log("Cart Item Deleted")
        return
    }
    
    console.log("Cart Item Not Deleted")
}

const deleteCart = async(userId) => {
    // let cartItems = await getAllCartItems(userId)
    // if (cartItems) {
    //     await cartItems.destroy()
    //     console.log("Cart Cleared")
    //     return cartItems
    // }
    await CartItem.collection().where({
        "user_id": userId
    }).fetch().then((CartItem) => {
        CartItem.forEach(function(cartItem) {
            cartItem.destroy()
        })
    })
    

}

const addOneQuantity = async(userId, productSlotId) => {
    let cartItem = await CartItem.where({
        "user_id": userId,
        "product_slots_id": productSlotId
    }).fetch({
        require: false
    })

    if (cartItem) {
        cartItem.set('cart_items_quantity', cartItem.get('cart_items_quantity') + 1)
        await cartItem.save()
    }
}

const removeOneQuantity = async(userId, productSlotId) => {
    let cartItem = await CartItem.where({
        "user_id": userId,
        "product_slots_id": productSlotId
    }).fetch({
        require: false
    })
    if (cartItem) {
        cartItem.set('cart_items_quantity', cartItem.get('cart_items_quantity') - 1)
        await cartItem.save()
    }
    
}




module.exports = {getAllCartItems, 
    getSpecificCartItems, 
    addCartItems, 
    addOneQuantity,
    removeOneQuantity,
    deleteCartItem,
    deleteCart
    }