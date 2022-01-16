const {Order, OrderItem, ProductSlot } = require("../models")

// (VENDOR) vendor to view all order items
const getOrderItems = async(vendor) => {
    let allVendorOrderItems = await OrderItem.where({
        'vendor_id': vendor
    }).fetchAll({
        require: false,
        withRelated: ['user', 'productslot', 'productslot.product', 'order']
    })
    return allVendorOrderItems.toJSON()
}

// (VENDOR) vendor to view specific order items
const getSpecificOrderItems = async(productSlotId) => {
    let vendorOrderItems = await OrderItem.where({
        "product_slots_id": productSlotId
    }).fetchAll({
        require: false, // true vs false
        withRelated: ['order', 'order.user']
    })
    return vendorOrderItems.toJSON()
}

// (VENDOR) change order status
const changeOrderStatus = async(userId, vendorId, productSlotId, orderId) => {
    console.log("changeOrderStatus called")
    let orderItemToBeChanged = await OrderItem.where({
        "user_id": userId,
        "vendor_id": vendorId,
        "product_slots_id": productSlotId,
        "order_id": orderId
    }).fetch()
    orderItemToBeChanged.set("order_item_status", "confirmed")
    orderItemToBeChanged.save()
    return orderItemToBeChanged.toJSON()
}


// (VENDOR) vendor to get contact details of users from order items





// (ON CHECKOUT) create order (invoice)
const createOrder = async(userId, totalCost) => {
    let newOrder = new Order({
        'order_date': new Date().toISOString().slice(0, 19).replace('T', ' '),
        'order_total_cost': totalCost,
        'order_status': "paid",
        'user_id': userId
    })

    let order = await newOrder.save()
    console.log("Order Created")
    return order.toJSON() // returns row as object
}


// (ON CHEKCOUT) ceate order items
const createOrderItems = async (orders, newOrder, userId) => {
    try {
        let orderId = newOrder.id
        for (let i = 0; i < orders.length; i++) {
            let newOrderItem = new OrderItem({
                'order_id': orderId,
                'product_slots_id': orders[i].product_slot_id,
                'order_item_quantity': orders[i].quantity,
                'order_item_status': "pending",
                'vendor_id': orders[i].vendor_id,
                "user_id": userId
            })
            await newOrderItem.save()
            console.log("Order Item created")
            }
    } 
    catch (e) {
        console.log('createOrderItems error =>', e)
    }
    return
}

module.exports = {
    createOrder,
    createOrderItems,
    getOrderItems,
    getSpecificOrderItems,
    changeOrderStatus
}