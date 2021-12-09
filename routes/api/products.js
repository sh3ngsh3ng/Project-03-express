const express = require("express")
const router = express.Router()

const productDataLayer = require("../../dal/products")


// get active listings of vendor's product
// both active product and their respective productslots are sent back
router.get("/active-listings", async (req,res) => {
    let activeListings = await productDataLayer.getActiveProductListings()
    console.log("called")
    res.json(activeListings)
})

// promotional listings


// featured listings


module.exports = router
