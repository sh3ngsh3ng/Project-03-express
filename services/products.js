const productsDataLayer = require("../dal/products")


// vendor side products services layer
const displayActiveListings = async(vendor) => {
    return await productsDataLayer.getActiveProductListings(vendor)
}

const displayInactiveListings = async(vendor) => {
    return await productsDataLayer.getInactiveProductListings(vendor)
}

module.exports = {
    displayActiveListings,
    displayInactiveListings
}