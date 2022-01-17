const express = require("express")
const router = express.Router()

router.get("/", async(req,res) => {
    console.log("called")
    res.send(200)
})

router.get("/pending", async(req,res) => {
    // get orders that are pending
    console.log("called")
    res.send("Pending Orders")
})


router.get("/order-history", async(req,res)=>{
    res.send("Order History")
})


// router.get("/notifications")



module.exports = router