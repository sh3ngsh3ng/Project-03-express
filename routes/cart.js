const express = require("express")
const router = express.Router()
const cartServiceLayer = require("../services/cart")


router.get("/", async (req,res) => {
    let cartItems = await cartServiceLayer.displayCartItems(1) // replace  1 with userId
    console.log(cartItems.toJSON())
    res.render("cart/index", {
        cartItems: cartItems.toJSON()
    })
})

router.get("/:productSlotId/add-item", async (req,res) => {
    await cartServiceLayer.addToCart(1, req.params.productSlotId) //change to user id
    res.redirect("/cart")
    console.log("added successfully")
})



module.exports = router