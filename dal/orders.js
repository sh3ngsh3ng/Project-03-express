const {Order, OrderItem, ProductSlot } = require("../models")

// (VENDOR) vendor to view their order items
const getSpecificOrderItems = async(productSlotId) => {
    console.log("getOrderItems Called")
    let vendorOrderItems = await OrderItem.where({
        "product_slots_id": productSlotId
    }).fetchAll({
        require: false, // true vs false
        withRelated: ['order', 'order.user']
    })
    return vendorOrderItems.toJSON()
}


// (VENDOR) vendor to get contact details of users from order items





// (ON CHECKOUT) create order (invoice)
const createOrder = async(userId, totalCost) => {
    let newOrder = new Order({
        'order_date': new Date().toISOString().slice(0, 19).replace('T', ' '),
        'order_total_cost': totalCost,
        'order_status': "processing",
        'user_id': userId
    })

    let order = await newOrder.save()
    console.log("Order Created")
    return order.toJSON() // returns row as object
}


// (ON CHEKCOUT) ceate order items
const createOrderItems = async (orders, newOrder) => {
    try {let orderId = newOrder.id
    for (let i = 0; i < orders.length; i++) {
        let newOrderItem = new OrderItem({
            'order_id': orderId,
            'product_slots_id': orders[i].product_slot_id,
            'order_item_quantity': orders[i].quantity,
            'order_item_status': "processing"
        })
        await newOrderItem.save()
        console.log("Order Item created")
    }} catch (e) {
        console.log('createOrderItems error =>', e)
    }
    return
}

module.exports = {
    createOrder,
    createOrderItems,
    getSpecificOrderItems
}