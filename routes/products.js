const express = require("express")
const router = express.Router()
const {Product} = require("../models")

router.get("/manage", (req,res) => {
    res.render('products/manage')
})

router.get("/manage/inventory", async (req,res) => {
    let products = await Product.collection().fetch()
    res.render("products/inventory")
})


module.exports = router