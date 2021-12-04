const express = require("express")
const router = express.Router()

const productDataLayer = require("../../dal/products")


// get active listings of vendor's product
router.get("/active-listings", async (req,res) => {
    let activeListings = await productDataLayer.getActiveProductListings()
    console.log("called")
    res.json(activeListings)
})




module.exports = router
