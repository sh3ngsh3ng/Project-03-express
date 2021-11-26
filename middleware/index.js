const checkIfAuthenticated = (req, res, next) => {
    if (req.session.vendor) {
        next()
    } else {
        req.flash("error_messages", "Please login to continue.")
        res.redirect("/login")
    }
}





module.exports = {
    checkIfAuthenticated
}