const express = require("express")
const router = express.Router()

// profile page
router.get("/profile", (req,res) => {
    const user = req.session.user
    if (!user) {
        res.send("you need to login")
    } else {
        res.render("vendor/profile", {
            'user': user
        })
    }
    
})


// schedule page
router.get("/schedule", (req,res) => {
    res.render('vendor/schedule')
})

// logout user
router.get("/logout", (req,res) => {
    req.session.user = null
    req.flash("success_messages", "You have logged out")
    res.redirect("/main")
} )


module.exports = router