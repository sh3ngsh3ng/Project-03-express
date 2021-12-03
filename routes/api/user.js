const express = require("express")
const router = express.Router()

const userDataLayer = require("../../dal/user")




// user sign up
router.post("/sign-up", express.json(), async(req,res) => {
    let newUser = req.body
    userDataLayer.userSignUp(newUser)
    res.send("ok")
})

router.post("/login", express.json(), async(req,res) => {
    let userField = req.body
    console.log(userField)
    let accessToken = await userDataLayer.userLogin(userField)
    if (accessToken) {
        res.send({
            accessToken
        })
    } else {
        res.send("Login Failed")
    }
    
})


module.exports = router