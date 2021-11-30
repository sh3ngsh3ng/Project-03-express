const productsDataLayer = require("../dal/products")


// vendor side products services layer
const displayActiveListings = async(vendor) => {
    return await productsDataLayer.getActiveProductListings(vendor)
}

const displayInactiveListings = async(vendor) => {
    return await productsDataLayer.getInactiveProductListings(vendor)
}

const displayAllProductSessions = async(vendor) => {
    let result = await productsDataLayer.getProductSlotsByVendorId(vendor)
    let allSessions = result.toJSON() // array of objects

    // get all the products


    // get all the sessions of the products

    console.log(allSessions)
    return allSessions
}

module.exports = {
    displayActiveListings,
    displayInactiveListings,
    displayAllProductSessions
}