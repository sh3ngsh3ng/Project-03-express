const express = require("express")
const hbs = require("hbs")
const wax = require("wax-on")
require("dotenv").config()
const session = require('express-session')
const flash = require('connect-flash')
const FileStore = require('session-file-store')(session)

let app = express()


app.set("view engine", "hbs")


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

app.use(function(req,res,next) {
    res.locals.success_messages = req.flash("success_messages")
    res.locals.error_messages = req.flash("error_messages")
    next()
})


// Routes
const loginSignUpRoutes = require("./routes/login-su")
const vendorRoutes = require("./routes/vendor")
const productRoutes = require("./routes/products")

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
}

main()

app.listen(3000, ()=> {
    console.log("Server Started")
})

