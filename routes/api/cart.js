const express = require("express")
const router = express.Router()
const cartServiceLayer = require("../../services/cart")


router.get("/:userId", async (req,res) => {
    let userId = req.params.userId
    let cartItems = await cartServiceLayer.displayCartItems(userId) 
    console.log(cartItems)
    res.json(cartItems)
})

router.get("/:userId/:productSlotId/add-item", async (req,res) => {
    await cartServiceLayer.addToCart(req.params.userId, req.params.productSlotId) //change to user id
    console.log("Item added")
    res.send("ok")
})

router.get("/:userId/:productSlotId/delete-item", async(req,res)=>{
    await cartServiceLayer.deleteItemFromCart(req.params.userId, req.params.productSlotId)
    console.log("Item deleted")
    res.send("ok")
})

router.get("/:userId/:productSlotId/delete-one", async(req,res)=>{
    await cartServiceLayer.removeOneQuantityFromCart(req.params.userId, req.params.productSlotId)
    console.log("Quantity - 1")
    res.send("ok")
})

router.get("/:userId/:productSlotId/add-one", async(req,res)=>{
    await cartServiceLayer.addOneQuantityToCart(req.params.userId, req.params.productSlotId)
    console.log("Quantity + 1")
    res.send("ok")
})

router.get("/:userId/clear", async(req,res)=>{
    await cartServiceLayer.deleteCart(req.params.userId)
    console.log("Cart Cleared")
    res.send("ok")
})

module.exports = router