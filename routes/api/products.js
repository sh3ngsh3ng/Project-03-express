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

// return all tags
router.get("/tags", async(req,res) => {
    const allTags = await productDataLayer.getAllTags()
    res.json(allTags)
})

// search for products
router.get("/search", async(req,res) => {
    let searchForm = createSearchForm()

    // base query + only active product listings shown
    let q = Product.collection().where({'product_status': 'active'})

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
            let name = req.query.name
            let max_cost = req.query.max_cost
            let room_type = req.query.room_type
            let play_time = req.query.play_time
            let age_restriction = parseInt(req.query.age_restriction)

            if (tags) {
                q = q.query('join', 'products_tags', 'products.id', 'product_id')
                .where('tag_id', 'in', tags)
            }

            if (name) {
                q = q.where('product_name', 'like', `%${name}%`)
            }

            if (max_cost) {
                q = q.where('product_price', '<=', max_cost * 100)
            }

            if (room_type) {
                q = q.where('room_type', '=', room_type)
            }

            if (play_time) {
                q = q.where('play_time', '=', play_time)
            }

            if (age_restriction) {
                q = q.where('age_restriction', '<', age_restriction)
            }


            let searchProducts = await q.fetch({
                withRelated: ['productslots', 'tags']
            })
            res.json(searchProducts)
        }
    })
})



module.exports = router
 