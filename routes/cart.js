const express = require("express")
const router = express.Router()



router.get("/", (req,res) => {
    res.render("cart/index")
})

// route.post("/:productSlotId/add-item", (req,res) => {



// })



module.exports = router