const express = require("express")
const router = express.Router()

router.get("/", (req,res) => {
    res.send("LOGIN HERE")
})

module.exports = router