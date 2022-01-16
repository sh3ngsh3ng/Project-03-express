const express = require("express")
const router = express.Router()
const ordersDataLayer = require("../dal/orders")
const { createFilterForm, bootstrapField } = require("../forms")
const { Product, ProductSlot, OrderItem } = require("../models")


// display all orders of a vendor
router.get("/", async (req,res) => {
    const filterForm = createFilterForm().toHTML(bootstrapField)
    let orders = await ordersDataLayer.getOrderItems(req.session.vendor.id)
    res.render('products/manage-orders', {
        orders, filterForm
    })
})

router.post("/", async (req,res) => {
    console.log("called")
    console.log("body =>", req.body)
    let filterForm = createFilterForm()

    filterForm.handle(req, {
        'empty': async(form) => {
            // display all
            let orders = await ordersDataLayer.getOrderItems(req.session.vendor.id)
            let filterForm = form.toHTML(bootstrapField)
            res.render('products/manage-orders', {
                orders, filterForm
            })
        },
        'error': async(form) => {
            // display all
            let orders = await ordersDataLayer.getOrderItems(req.session.vendor.id)
            let filterForm = form.toHTML(bootstrapField)
            req.flash("error_messages", "No results found")
            res.render('products/manage-orders', {
                orders, filterForm
            })
        },
        'success': async(form) => {
            // return search resutls

            let payment_status = req.body.payment_status
            let name = req.body.name
            let q = OrderItem.where({'vendor_id': req.session.vendor.id})
            filterForm = filterForm.toHTML(bootstrapField)

            if (payment_status) {
                if (payment_status == "processing") {
                    q = q.where({"order_item_status": "processing"})
                }

                if (payment_status == "paid") {
                    q = q.where({"order_item_status": "paid"})
                }

                if (payment_status == "cancelled") {
                    q = q.where({"order_item_status": "cancelled"})
                }

            }

            
            // if (name) {
            //     try {
            //     q =  q.query('join', 'order_items', 'orders.id', 'order_id')
            //     console.log(q)
            //     let result = await q.fetchAll()
            //     result = result.toJSON()
            //     console.log("result =>", result)
            //     res.send("Success")}
            //     catch (e) {
            //         console.log("error =>", e)
            //     }
            // }

            let orders = await q.fetchAll({
                require: false,
                withRelated: ['order', 'order.user']
            })
            console.log(orders)
            orders = orders.toJSON()
            res.render('products/manage-orders', {
                orders, filterForm
            })
        }
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
