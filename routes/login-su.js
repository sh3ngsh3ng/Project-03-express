const express = require("express")
const router = express.Router()
const {User} = require("../models")

const {createRegistrationForm, bootstrapField} = require("../forms")

// display sign up form
router.get("/sign-up", (req,res) => {
    const registerForm = createRegistrationForm()
    res.render("login-su/sign-up", {
        'form': registerForm.toHTML(bootstrapField)
    })
})


// process sign up form
router.post("/sign-up", (req,res) => {
    const registerForm = createRegistrationForm()
    registerForm.handle(req, {
        'success': async(form) => {
            const user = new User({
                'username': form.data.username,
                'password': form.data.password,
                'user_type': "admin",
            })

            await user.save()
            req.flash("success_messages", "You have signed up successfully!")
            res.redirect("/login")
        },
        'error': (form) => {
            res.render("login-su/sign-up", {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

module.exports = router