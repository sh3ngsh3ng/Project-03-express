const express = require("express")
const router = express.Router()
const {Product, ProductSlot} = require("../models")
const {bootstrapField, createProductForm, createAddSessionForm} = require ("../forms")
const {checkIfAuthenticated, cloudinaryVariables} = require("../middleware")
// var helpers = require("handlebars-helpers")()





// view all products
router.get("/", checkIfAuthenticated, async (req,res) => {
    let products = await Product.collection().where({
        "vendor_id": req.session.vendor.id
    }).fetch({
        require: true
    })
    res.render("products/inventory", {
        'products': products.toJSON()
    })
})

// view add product form
router.get('/add', [checkIfAuthenticated, cloudinaryVariables], (req,res)=>{
    const productForm = createProductForm()
    res.render('products/add-product', {
        'form': productForm.toHTML(bootstrapField),
    })
})

// process add product form
router.post('/add', checkIfAuthenticated, async(req,res)=>{
    const productForm = createProductForm()
    productForm.handle(req, {
        'success': async(form) => {
            const product = new Product()

            // product.set(form.data)

            product.set('product_name', form.data.product_name)
            product.set('product_description', form.data.product_description)
            product.set('product_price', form.data.product_price * 100)
            product.set('vendor_id', req.session.vendor.id)
            product.set('product_status', "inactive")
            product.set('thumbnail_url', form.data.thumbnail_url)
            product.set('image_url', form.data.image_url)
            product.set('room_size', form.data.room_size)
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
router.get('/:product_id/update', [checkIfAuthenticated, cloudinaryVariables], async (req, res) => {
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
    productForm.fields.room_size.value = product.get("room_size")

    res.render("products/update-product", {
        'form': productForm.toHTML(bootstrapField),
        'product': product.toJSON()
    })
})


// process update product form
router.post("/:product_id/update", checkIfAuthenticated, async(req,res) => {
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
router.get("/:product_id/delete", checkIfAuthenticated, async(req,res)=> {
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
router.post("/:product_id/delete", checkIfAuthenticated, async(req,res)=>{
    const product = await Product.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    })

    await product.destroy()
    res.redirect("/products")
})


// view for adding session of product (into product slots table)
router.get("/:product_id/add-session", checkIfAuthenticated, async(req,res)=> {
    const productId = req.params.product_id
    const product = await Product.where({
        'id': productId
    }).fetch({
        require: true
    })
    
    const addSessionForm = createAddSessionForm()

    res.render("products/add-session", {
        'product': product.toJSON(),
        'form': addSessionForm
    })
})

// process adding session of product (into product slots table)
router.post("/:product_id/add-session", checkIfAuthenticated, async(req,res)=> {
    const addSessionForm = createAddSessionForm()

    addSessionForm.handle(req, {
        'success': async (form) => {

            const product = await Product.where({
                'id': req.params.product_id
            }).fetch({
                require: true
            })

            const productSlot = new ProductSlot()
            productSlot.set("slot_date", form.data.slot_date)
            productSlot.set("slot_time", form.data.slot_time)
            productSlot.set('slot_availability', true)
            productSlot.set('slot_quantity', product.room_size)
            productSlot.set('product_id', req.params.product_id)
            await productSlot.save()
            res.redirect("/products")
        },
        'error': async(form) => {
            // req.flash("error_messages", "Please fill up the form properly")
            res.render('products/add-session', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })


})


module.exports = router