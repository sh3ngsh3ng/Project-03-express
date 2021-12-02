const express = require("express")
const router = express.Router()
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const cartServiceLayer = require("../services/cart")

// router.get("/checkout", (req,res)=>{

//     // create line items for checkout
//     let cart = await cartServiceLayer.displayCartItems(1)

//     let lineItems = []
//     let metadata = []
//     for (let item of cartItems) {
//         const lineItem = {
//             'name': item.related(??).get(??),
//             'amount': item.related(??).get(??),
//             'quantity': item.get(??),
//             'currency': 'SGD'
//         }
//         if (item.related('product').get('image')) {

//         }

//         lineItems.push(lineItem)

//         metadata.push({
//             'product_id': item.related().get(),
//             'quantity': item.get('quantity')
//         })
//     }

//     // create payment session
//     let metadataJSON = JSON.stringify(metadata)
//     let payment = {
//         'payment_method': ['card'],
//         'line_items': lineItems,
//         'success_url': "https://www.google.com",
//         'cancel_url': "https://www.yahoo.com",
//         'metadata': {
//             'orders': metadataJSON
//         }
//     }


//     // register session with stripe
//     let stripeSession = await stripe.checkout.sessions.create(payment)


//     // send back to the browser
//     res.render('checkout/checkout', {
//         'sessionId': stripeSession.id,
//         'publishableKey': process.env.STRIPE_PUBLISHABLE_KEY
//     })


// })





