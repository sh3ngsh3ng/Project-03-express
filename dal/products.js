const {Product} = require("../models")


// api products data layer
const getActiveProductListings = async() => {
    return await Product.collection().where({
        "product_status": "active"
    }).fetch({
        require: false,
        withRelated: ['productslots']
    })
}




// vendor products data layer
const getActiveProductListingsOfVendor = async (vendor) => {
    return await Product.collection().where({
        "vendor_id": vendor,
        "product_status": "active"
    }).fetch({
        require: false
    })
}

const getInactiveProductListingsOfVendor = async(vendor) => {
    return await Product.collection().where({
        "vendor_id": vendor,
        "product_status": "inactive"
    }).fetch({
        require: false
    })
}

const getProductSlotsByVendorId = async(vendor) => {
    let vendorProductsWithProductSlots = await Product.where({"vendor_id": vendor}).fetchAll({
        require: false,
        withRelated: ['productslots']
    })
    return vendorProductsWithProductSlots
} 

module.exports = {
    getActiveProductListingsOfVendor,
    getInactiveProductListingsOfVendor,
    getProductSlotsByVendorId,
    getActiveProductListings
}