const express = require("express")
const router = express.Router()

// profile page
router.get("/profile", (req,res) => {
    const vendor = req.session.vendor
    if (!vendor) {
        res.send("you need to login")
    } else {
        res.render("vendor/profile", {
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
    res.redirect("/login")
} )


module.exports = router