const express = require("express")
const router = express.Router()
const {Product} = require("../models")
const {bootstrapField, createProductForm} = require ("../forms")
const {checkIfAuthenticated} = require("../middleware")

// view all products
router.get("/", checkIfAuthenticated, async (req,res) => {
    let products = await Product.collection().fetch()
    res.render("products/inventory", {
        'products': products.toJSON()
    })
})

// view add product form
router.get('/add', checkIfAuthenticated, (req,res)=>{
    const productForm = createProductForm()
    res.render('products/add-product', {
        'form': productForm.toHTML(bootstrapField)
    })
})

// process add product form
router.post('/add', checkIfAuthenticated, async(req,res)=>{
    const productForm = createProductForm()
    productForm.handle(req, {
        'success': async(form) => {
            const product = new Product()
            // product.set('product_name', form.data.title)
            // product.set('product_description', form.data.description)
            // product.set('product_price', form.data.price)
            product.set(form.data)
            product.set('vendor_id', 1)
            await product.save()
            req.flash("success_messages", "New Product has been added")
            res.redirect('/products')
        },
        'error': async(form) => {
            req.flash("error_messages", "Please fill up the form properly")
            res.render('products/add-product', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

// view update product form
router.get('/:product_id/update', async (req, res) => {
    const productId = req.params.product_id
    const product = await Product.where({
        'id': productId
    }).fetch({
        require: true
    })

    const productForm = createProductForm()

    productForm.fields.product_name.value = product.get('product_name')
    productForm.fields.product_description.value = product.get('product_description')
    productForm.fields.product_price.value = product.get('product_price')

    res.render("products/update-product", {
        'form': productForm.toHTML(bootstrapField),
        'product': product.toJSON()
    })
})


// process update product form
router.post("/:product_id/update", async(req,res) => {
    const product = await Product.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    })

    const productForm = createProductForm()
    productForm.handle(req, {
        'success': async(form) => {
            product.set(form.data)
            product.save()
            res.redirect("/products")
        },
        'error': async(form) => {
            res.render("products/update-product", {
                'form': form.toHTML(bootstrapField),
                'product': product.toJSON()
            })
        }
    })
})

// view for deletion of product
router.get("/:product_id/delete", async(req,res)=> {
    const product = await Product.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    })

    res.render('products/delete-product', {
        'product': product.toJSON()
    })

})


// process deletion of product
router.post("/:product_id/delete", async(req,res)=>{
    const product = await Product.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    })

    await product.destroy()
    res.redirect("/products")
})


module.exports = router