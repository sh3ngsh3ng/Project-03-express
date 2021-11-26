const express = require("express")
const router = express.Router()
const {User} = require("../models")

const {createRegistrationForm, createLoginForm, bootstrapField} = require("../forms")

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
                'email': form.data.email,
                'user_type': "admin"
            })

            // user.set((form) => {
            //     let data = form.data
            //     const {confirm_password, ...newData} = data
            //     return newData
            // })

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

// view login form
router.get("/login", (req,res) => {
    const loginForm = createLoginForm()
    res.render("login-su/login", {
        'form': loginForm.toHTML(bootstrapField)
    })
})


// process login form
router.post("/login", (req,res) => {
    const loginForm = createLoginForm()
    loginForm.handle(req, {
        'success': async (form) => {
            let user = await User.where({
                'username': form.data.username
            }).fetch({
                require: false
            })

            if (!user) {
                req.flash("error_messages", "Login Failed. Please try again.")
                res.redirect("/login")
            } else {
                // user found (login success + fail)
                if (user.get("password") === form.data.password) {
                    // to store details in session file
                    req.session.user = {
                        id: user.get("id"),
                        username: user.get('username'),
                        email: user.get('email')
                    }
                    req.flash("success_messages", "You have logged in successfully! " + user.get("username"))
                    res.redirect("/user/profile")
                } else {
                    req.flash("error_messages", "Login Failed. Please try again")
                    res.redirect("/login")
                }
                
            }

        },
        'error': async(form) => {
            req.flash("error_messages", "Login Failed. Please try again")
            res.render("login-su/login", {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

module.exports = router