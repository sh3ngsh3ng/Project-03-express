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

const getProductSlotsByVendorId = async(vendor) => {
    let vendorSessions = await Product.where({"vendor_id": vendor}).fetchAll({
        require: false,
        withRelated: ['productslots']
    })
    return vendorSessions
} 

module.exports = {
    getActiveProductListings,
    getInactiveProductListings,
    getProductSlotsByVendorId
}