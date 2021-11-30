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
    let allProducts = result.toJSON() // array of objects (products)
    let arrayOfProductsWithSessions = []
    // select products with product slots
    for (let i = 0; i < allProducts.length; i++) {
        let productSlotsArray = allProducts[i].productslots
        if (productSlotsArray.length > 0) {
            arrayOfProductsWithSessions.push(allProducts[i])
        }
    }
    
    return arrayOfProductsWithSessions
}

module.exports = {
    displayActiveListings,
    displayInactiveListings,
    displayAllProductSessions
}