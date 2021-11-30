const express = require("express")
const {Product} = require("../models")


// vendor side products data layer
const getActiveProductListings = async (vendor) => {
    return await Product.collection().where({
        "vendor_id": vendor,
        "product_status": "active"
    }).fetch({
        require: false
    })
}

const getInactiveProductListings = async(vendor) => {
    return await Product.collection().where({
        "vendor_id": vendor,
        "product_status": "inactive"
    }).fetch({
        require: false
    })
}


module.exports = {
    getActiveProductListings,
    getInactiveProductListings
}