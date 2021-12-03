
const {User} = require("../models")
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const hashPassword = (password) => {
    const md5 = crypto.createHash('md5')
    const hash = md5.update(password).digest('base64')
    return hash
}


const generateAccessToken = (user) => {
    return jwt.sign({
        'username': user.get('username'),
        'id': user.get('id'),
        'email': user.get('email')
    }, process.env.TOKEN_SECRET, {
        expiresIn: "1h"
    })
}

const userSignUp = async(userField) => {
    const {confirmPassword, ...fields} = userField
    let newUser = new User({
        "username": fields.username,
        "password": hashPassword(fields.password),
        "email": fields.email,
        "user_type": "normal"
    })
    await newUser.save()
    return newUser
}

const userLogin = async(userField) => {
    let user = await User.where({
        'username': userField.username
    }).fetch({
        require: false
    })

    if (user && user.get("password") == hashPassword(userField.password)) {
        let accessToken = generateAccessToken(user)
        return accessToken
    } else {
        return false
    }

}



module.exports = {
    userSignUp,
    userLogin
}

