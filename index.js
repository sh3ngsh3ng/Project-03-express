const express = require("express")
const hbs = require("hbs")
const wax = require("wax-on")
require("dotenv").config()



let app = express()


app.set("view engine", "hbs")


wax.on(hbs.handlebars)
wax.setLayoutPath("./views/layouts")

app.use(
    express.urlencoded({
        extended: false
    })
)


// Routes
const loginRoutes = require("./routes/login")
const vendorRoutes = require("./routes/vendor")
const productRoutes = require("./routes/products")

async function main() {
    // Main Page
    app.get("/", (req,res) => {
        res.send("Server is live")
    })

    // Login Route
    app.use("/login", loginRoutes)

    // Vendor Route
    app.use("/user", vendorRoutes)

    // Manage Product Routes
    app.use("/products", productRoutes)
}

main()

app.listen(3000, ()=> {
    console.log("Server Started")
})

