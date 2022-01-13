const {Order, OrderItem } = require("../models")

// create order (invoice) for user
const createOrder = async(userId, totalCost) => {
    let newOrder = new Order({
        'order_date': new Date().toISOString().slice(0, 19).replace('T', ' '),
        'order_total_cost': totalCost,
        'order_status': "processing",
        'user_id': userId
    })

    let order = await newOrder.save()
    console.log("order => ",order.toJSON())
    return order.toJSON() // returns row as object
}

// ceate order items
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
    createOrderItems
}