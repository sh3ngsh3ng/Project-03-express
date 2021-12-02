const express = require("express")
const router = express.Router()
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const cartServiceLayer = require("../services/cart")
const checkoutServiceLayer = require("../services/checkout")


// route to check out cart items
router.get("/", async (req,res)=>{

    // create line items for checkout
    let cartItems = await cartServiceLayer.displayCartItems(1)
    
    let lineItems = []
    let metadata = []
    for (let item of cartItems) {

        const lineItem = {
            'name': item.related('productslot').related("product").get('product_name'),
            'amount': item.related('productslot').related("product").get('product_price'),
            'quantity': item.get("cart_items_quantity"),
            'currency': 'SGD'
        }
        if (item.related('productslot').related("product").get('thumbnail_url')) {
            lineItem['images'] = [item.related("productslot").related('product').get("thumbnail_url")]
        }

        lineItems.push(lineItem)

        metadata.push({
            'product_id': item.related('productslot').related("product").get('id'),
            'product_slot_id': item.get("id"),
            'quantity': item.get("cart_items_quantity")
        })
    }

    // create payment session
    let metadataJSON = JSON.stringify(metadata)
    let payment = {
        'payment_method_types': ['card'],
        'line_items': lineItems,
        'success_url': process.env.STRIPE_SUCCESS_URL,
        'cancel_url': process.env.STRIPE_ERROR_URL,
        'metadata': {
            'orders': metadataJSON
        }
    }

    // register session with stripe
    let stripeSession = await Stripe.checkout.sessions.create(payment)

    // send back to the browser
    res.render('checkout/checkout', {
        'sessionId': stripeSession.id,
        'publishableKey': process.env.STRIPE_PUBLISHABLE_KEY
    })

})

// webhook after payment made
router.post("/process_payment", express.raw({type:'application/json'}), async (req,res)=> {
    let payload = req.body

    let endpointSecret = process.env.STRIPE_ENDPOINT_SECRET

    // extract signature header
    let sig = req.headers['stripe-signature']

    let event

    try{
        event = Stripe.webhooks.constructEvent(payload, sig, endpointSecret)
        if (event.type == "checkout.session.completed") {
            let stripeSession = event.data.object
            let orders = JSON.parse(stripeSession.metadata.orders)
            console.log(orders)

            await checkoutServiceLayer.onCheckOut(orders, 1)


            res.send({
                'received': true
            })
        }
    } catch (e) {
        // handle errors
        res.send({
            'received': false
        })
    }

})


module.exports = router



