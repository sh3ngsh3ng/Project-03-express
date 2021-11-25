const express = require("express")
const router = express.Router()
const {Product} = require("../models")
const {bootstrapField, createProductForm} = require ("../forms")

router.get("/", async (req,res) => {
    let products = await Product.collection().fetch()
    console.log(products.toJSON())
    res.render("products/inventory", {
        'products': products.toJSON()
    })
})

router.get('/add', (req,res)=>{
    const productForm = createProductForm()
    res.render('products/add-product', {
        'form': productForm.toHTML(bootstrapField)
    })
})

router.post('/add', async(req,res)=>{
    const productForm = createProductForm()
    productForm.handle(req, {
        'success': async(form) => {
            const product = new Product()
            product.set('product_name', form.data.title)
            product.set('product_description', form.data.description)
            product.set('product_price', form.data.price)
            product.set('vendor_id', 1)
            await product.save()
            res.redirect('/products')
        },
        'error': async(form) => {
            res.render('products/add-product', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

module.exports = router