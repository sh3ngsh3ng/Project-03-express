const express = require("express")
const router = express.Router()

// profile page
router.get("/dashboard", (req,res) => {
    const vendor = req.session.vendor
    if (!vendor) {
        res.send("you need to login")
    } else {
        res.render("vendor/dashboard", {
            'vendor': vendor
        })
    }
})

// schedule page
router.get("/schedule", (req,res) => {
    res.render('vendor/schedule')
})

// logout user
router.get("/logout", (req,res) => {
    req.session.vendor = null
    req.flash("success_messages", "You have logged out")
    res.redirect("/")
} )


module.exports = router