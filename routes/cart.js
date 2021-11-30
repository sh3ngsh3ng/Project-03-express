const express = require("express")
const router = express.Router()
const cartServiceLayer = require("../services/cart")


router.get("/", async (req,res) => {
    let cartItems = await cartServiceLayer.displayCartItems(1)
    res.render("cart/index")
})

router.get("/:productSlotId/add-item", async (req,res) => {
    await cartServiceLayer.addToCart(1, req.params.productSlotId, 1) //change to user id
    res.render("cart/index")
    console.log("added successfully")
})



module.exports = router