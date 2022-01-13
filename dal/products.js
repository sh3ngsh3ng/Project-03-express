const {Product, Tag} = require("../models")


// api products data layer
const getActiveProductListings = async() => {
    return await Product.collection().where({
        "product_status": "active"
    }).fetch({
        require: false,
        withRelated: ['productslots', 'tags']
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
    try {let vendorProductsWithProductSlots = await Product.where({"vendor_id": vendor}).fetchAll({
        require: false,
        withRelated: ['productslots']
    })
    console.log(vendorProductsWithProductSlots.toJSON())
    return vendorProductsWithProductSlots}
    catch (e) {
        console.log("error =>", e)
    }
} 

const getAllTags = async() => {
    let allTags = await Tag.fetchAll().map(tag => [tag.get('id'), tag.get('name')])
    return allTags
}

module.exports = {
    getActiveProductListingsOfVendor,
    getInactiveProductListingsOfVendor,
    getProductSlotsByVendorId,
    getActiveProductListings,
    getAllTags
}