const express = require("express")
const { OrderItem, Order } = require("../../models")
const router = express.Router()

router.get("/", async(req,res) => {
    console.log("called")
    res.send(200)
})

router.get("/pending", async(req,res) => {
    // get orderitems that are pending
    let pendingOrderItems = await OrderItem.where({
        "user_id": req.query.userId,
        "order_item_status": "pending"
    }).fetchAll({
        require: false,
        withRelated: ['order', 'productslot', 'productslot.product']
    })
    res.json(pendingOrderItems)
})


router.get("/order-history", async(req,res)=>{
    // let orderHistory = await OrderItem.where({
    //     "user_id": req.query.userId,
    //     "order_item_status": "confirmed"
    // }).fetchAll({
    //     require: false,
    //     withRelated: ['order', 'productslot', 'productslot.product']
    // })
    // res.json(orderHistory)
    let orderHistory = await Order.where({
        "user_id": req.query.userId
    }).fetchAll({
        require: false,
        withRelated: ['orderitems', 'orderitems.productslot', 'orderitems.productslot.product']
    })
    res.json(orderHistory)
})


// router.get("/notifications")



module.exports = router