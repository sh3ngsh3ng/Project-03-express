const {Order} = require("../models")

const createOrder = async(userId) => {
    console.log("called")
    let newOrder = new Order({
        'order_date': new Date().toISOString().slice(0, 19).replace('T', ' '),
        'order_total_cost': 3000,
        'order_status': "pending",
        'user_id': userId
    })
    console.log(newOrder.toJSON())
    try {
        await newOrder.save()
    } catch (e) {
        console.log(e)
        return
    }
    
    return
}


module.exports = {
    createOrder
}