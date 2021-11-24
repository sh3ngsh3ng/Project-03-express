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

async function main() {
    // Main Page
    app.get("/", (req,res) => {
        res.send("Server is live")
    })

    app.use("/login", loginRoutes)
}

main()

app.listen(3000, ()=> {
    console.log("Server Started")
})

