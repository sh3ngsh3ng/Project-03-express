const express = require("express")
const router = express.Router()
const ordersDataLayer = require("../dal/orders")


// display all orders of a product slot
router.get("/:productSlotId", async (req, res) => {
    let orders = await ordersDataLayer.getSpecificOrderItems(req.params.productSlotId)
    res.render('products/manage-orders', {
        orders
    })
    // res.send(orders)
})



// add orders

module.exports = router
