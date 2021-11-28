const checkIfAuthenticated = (req, res, next) => {
    if (req.session.vendor) {
        next()
    } else {
        req.flash("error_messages", "Please login to continue.")
        res.redirect("/login")
    }
}


const cloudinaryVariables = (req,res,next) => {
    res.locals.cloudinary_variables = {
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    }
    next()
}


module.exports = {
    checkIfAuthenticated,
    cloudinaryVariables
}