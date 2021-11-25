const express = require("express")
const router = express.Router()
const {Product} = require("../models")


router.get("/", async (req,res) => {
    let products = await Product.collection().fetch()
    console.log(products.toJSON())
    res.render("products/inventory", {
        'products': products.toJSON()
    })
})

router.get('/add', async(req,res)=>{
    
})



module.exports = router