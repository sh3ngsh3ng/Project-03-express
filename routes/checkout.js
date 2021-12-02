const express = require("express")
const router = express.Router()
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const cartServiceLayer = require("../services/cart")

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

module.exports = router



