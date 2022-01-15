const express = require("express")
const router = express.Router()
const ordersDataLayer = require("../dal/orders")
const { createFilterForm, bootstrapField } = require("../forms")
const { ProductSlot } = require("../models")


// display all orders of a vendor
router.get("/", async (req,res) => {
    
    console.log("result => ", result.toJSON())
    const filterForm = createFilterForm().toHTML(bootstrapField)
    let orders = await ordersDataLayer.getOrderItems(req.session.vendor.id)
    res.render('products/manage-orders', {
        orders, filterForm
    })
})


// change to post to "/"
// display all orders of a specific product slot
router.get("/:productSlotId", async (req, res) => {
    let orders = await ordersDataLayer.getSpecificOrderItems(req.params.productSlotId)
    const filterForm = createFilterForm()
    res.render('products/manage-orders', {
        orders, filterForm
    })
    // res.send(orders)
})
// sorting
// let result = await ProductSlot.collection().orderBy('slot_datetime', 'ASC').fetch({
    //     require: false
    // }) // DESC

// add orders

module.exports = router
