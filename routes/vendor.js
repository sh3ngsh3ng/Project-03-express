const express = require("express")
const router = express.Router()

router.get("/profile", (req,res) => {
    res.render("vendor/index")
})

router.get("/schedule", (req,res) => {
    res.render('vendor/schedule')
})

module.exports = router