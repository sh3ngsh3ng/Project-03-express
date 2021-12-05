const express = require("express")
const router = express.Router()
const cartServiceLayer = require("../../services/cart")

// get user's cart
router.get("/:userId", async (req,res) => {
    let userId = req.params.userId
    let cartItems = await cartServiceLayer.displayCartItems(userId)
    console.log("Cart Items Retrieved") 
    res.json(cartItems)
})

// add item to user's cart
router.get("/:userId/:productSlotId/add-item", async (req,res) => {
    await cartServiceLayer.addToCart(req.params.userId, req.params.productSlotId) //change to user id
    console.log("Item added")
    res.send("ok")
})

// delete item from user's cart
router.get("/:userId/:productSlotId/delete-item", async(req,res)=>{
    await cartServiceLayer.deleteItemFromCart(req.params.userId, req.params.productSlotId)
    console.log("Item deleted")
    res.send("ok")
})

// delete one quantity of cart item from user's cart
router.get("/:userId/:productSlotId/delete-one", async(req,res)=>{
    await cartServiceLayer.removeOneQuantityFromCart(req.params.userId, req.params.productSlotId)
    console.log("Quantity - 1")
    res.send("ok")
})

// add one quantity of cart item to user's cart
router.get("/:userId/:productSlotId/add-one", async(req,res)=>{
    await cartServiceLayer.addOneQuantityToCart(req.params.userId, req.params.productSlotId)
    console.log("Quantity + 1")
    res.send("ok")
})

// clear user's cart
router.get("/:userId/clear", async(req,res)=>{
    await cartServiceLayer.deleteCart(req.params.userId)
    console.log("Cart Cleared")
    res.send("ok")
})

module.exports = router