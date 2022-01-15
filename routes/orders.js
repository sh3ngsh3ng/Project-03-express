const express = require("express")
const router = express.Router()
const ordersDataLayer = require("../dal/orders")
const { createFilterForm, bootstrapField } = require("../forms")


// display all orders of a vendor
router.get("/", async (req,res) => {
    console.log("called")
    console.log("All Orders")
    const filterForm = createFilterForm().toHTML(bootstrapField)
    let orders = await ordersDataLayer.getOrderItems(req.session.vendor.id)
    res.render('products/manage-orders', {
        orders, filterForm
    })
})


// change to post
// display all orders of a specific product slot
router.get("/:productSlotId", async (req, res) => {
    let orders = await ordersDataLayer.getSpecificOrderItems(req.params.productSlotId)
    const filterForm = createFilterForm()
    res.render('products/manage-orders', {
        orders, filterForm
    })
    // res.send(orders)
})



// add orders

module.exports = router
