const express = require("express")
const hbs = require("hbs")
const wax = require("wax-on")
require("dotenv").config()
const session = require('express-session')
const flash = require('connect-flash')
const FileStore = require('session-file-store')(session)
const csrf = require('csurf')



let app = express()


app.set("view engine", "hbs")

// custom handlebars
hbs.handlebars.registerHelper('ifEqual', function(x, y, options) {
    return (x == y) ? options.fn(this) : options.inverse(this)
})

hbs.handlebars.registerHelper('changeToDollar', function(x) {
    return x / 100
})


app.use(express.static("public"))

wax.on(hbs.handlebars)
wax.setLayoutPath("./views/layouts")


// Middlewares
app.use(
    express.urlencoded({
        extended: false
    })
)

app.use(session({
    store: new FileStore(),
    secret: 'testingsession',
    resave: false,
    saveUninitialized: true
}))

app.use(flash())


// middle ware to save flash messages
app.use(function(req,res,next) {
    res.locals.success_messages = req.flash("success_messages")
    res.locals.error_messages = req.flash("error_messages")
    next()
})

// middle ware to pass session information for vendor to all hbs
app.use(function(req,res,next) {
    res.locals.vendor = req.session.vendor
    next()
})

// middleware to enable csrf for all routes
app.use(csrf())

// handle csrf error 
app.use(function(err, req, res, next) {
    if (err && err.code == "EBADCSRFTOKEN") {
        req.flash('error_messages', "The form has expired. Please try again.")
        res.redirect('back')
    } else {
        next()
    }
})

// share csrf token with all hbs
app.use(function(req,res,next){
    res.locals.csrfToken = req.csrfToken()
    next()
})



// Routes
const loginSignUpRoutes = require("./routes/login-su")
const vendorRoutes = require("./routes/vendor")
const productRoutes = require("./routes/products")
const uploadImage = require("./routes/cloudinary")
const cartRoutes = require("./routes/cart")
const { options } = require("./routes/products")


async function main() {


    // Main Page
    app.get("/main", (req,res)=> {
        res.send("Main Page" + res.locals.success_messages)
    })
    // Login Route
    app.use("/", loginSignUpRoutes)

    // Vendor Route
    app.use("/vendor", vendorRoutes)

    // Manage Product Routes
    app.use("/products", productRoutes)

    // Upload image to cloudinary
    app.use("/upload-image", uploadImage)


    // shopping cart
    app.use("/cart", cartRoutes)
}

main()

app.listen(3000, ()=> {
    console.log("Server Started")
})

