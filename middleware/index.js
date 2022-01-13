const jwt = require('jsonwebtoken')

// check vendor's authentication with session
const checkIfAuthenticated = (req, res, next) => {
    if (req.session.vendor) {
        next()
    } else {
        req.flash("error_messages", "Please login to continue.")
        res.redirect("/")
    }
}

// pass cloudinary variables to hbs files through routing
const cloudinaryVariables = (req,res,next) => {
    res.locals.cloudinary_variables = {
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    }
    next()
}

// check user's authentication with jwt
const checkIfAuthenticatedJWT = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403) // forbidden
            }

            req.user = user
            next()
        })
    } else {
        res.sendStatus(401) // unauthorized
    }

}


module.exports = {
    checkIfAuthenticated,
    cloudinaryVariables,
    checkIfAuthenticatedJWT
}