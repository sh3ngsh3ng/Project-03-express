const express = require("express")
const router = express.Router()
const ordersDataLayer = require("../dal/orders")
const { createFilterForm, bootstrapField } = require("../forms")
const { Product, ProductSlot, OrderItem } = require("../models")


// display all orders of a vendor
router.get("/", async (req,res) => {
    console.log("called")
    const filterForm = createFilterForm().toHTML(bootstrapField)
    let orders = await ordersDataLayer.getOrderItems(req.session.vendor.id)
    console.log(orders)
    res.render('products/manage-orders', {
        orders, filterForm
    })
})

// seach orders
router.post("/", async (req,res) => {
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
            req.flash("error_messages", "Search Error")
            res.render('products/manage-orders', {
                orders, filterForm
            })
        },
        'success': async(form) => {
            // return search resutls

            let order_status = req.body.order_status
            let name = req.body.name
            let q = OrderItem.where({'order_items.vendor_id': req.session.vendor.id})
            filterForm = filterForm.toHTML(bootstrapField)

            if (order_status) {
                if (order_status == "pending") {
                    q = q.where({"order_item_status": "pending"})
                }

                if (order_status == "confirmed") {
                    q = q.where({"order_item_status": "confirmed"})
                }

                if (order_status == "cancelled") {
                    q = q.where({"order_item_status": "cancelled"})
                }

            }

            if (name) {
                q =  q.query('join', 'users', 'users.id', 'order_items.user_id')
                .query('join', 'product_slots', 'product_slots_id', 'order_items.product_slots_id')
                .query('join', 'products', 'product_id', 'product_slots.product_id')
                .where('username', 'like', `%${name}%`)
            }



            let orders = await q.fetchAll({
                require: false,
                withRelated: ['user', 'productslot', 'productslot.product', 'order']
            })
            
            orders = orders.toJSON()

            if (orders.length == 0) {
                res.render('products/manage-orders', {
                    orders, filterForm
                })
            } else {
                res.render('products/manage-orders', {
                    orders, filterForm
                })
            }
            
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


// change order status
router.get("/update-status/confirm", async(req,res) => {
    console.log("called")
    // authenticate
    let userId = req.query.userId
    let productSlotId = req.query.productSlotId
    let vendorId = req.query.vendorId
    let orderId = req.query.orderId
    let orderStatus = req.query.orderStatus

    console.log(userId, productSlotId, vendorId)
    let changeOrder = await ordersDataLayer.changeOrderStatus(userId, vendorId, productSlotId, orderId, orderStatus)
    res.redirect("/")
})


module.exports = router
