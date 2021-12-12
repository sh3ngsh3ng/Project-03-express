const express = require("express")
const router = express.Router()
const productDataLayer = require("../../dal/products")
const { createSearchForm } = require("../../forms")
const {Product} = require("../../models")


// get active listings of vendor's product
// both active product and their respective productslots are sent back
router.get("/active-listings", async (req,res) => {
    let activeListings = await productDataLayer.getActiveProductListings()
    res.json(activeListings)
})

router.get("/tags", async(req,res) => {
    const allTags = await productDataLayer.getAllTags()
    res.json(allTags)
})

// search for products
router.get("/search", async(req,res) => {
    let searchForm = createSearchForm()
    const allTags = productDataLayer.getAllTags()
    let q = Product.collection()

    searchForm.handle(req, {
        'empty': async(form) => {
            let activeListings = await productDataLayer.getActiveProductListings()
            res.json(activeListings)
        },
        'error': async(form) => {
            // can handle error here
            let activeListings = await productDataLayer.getActiveProductListings()
            res.json(activeListings)
        },
        'success': async(form) => {
            // return search results

            let tags = req.query.tags
            console.log(tags)
            if (tags) {
                q = q.query('join', 'products_tags', 'products.id', 'product_id')
                .where({'product_status': 'active'}).where('tag_id', 'in', tags)

            }
            let searchProducts = await q.fetch({
                withRelated: ['productslots', 'tags']
            })
            res.json(searchProducts)
        }
    })
})



module.exports = router
 