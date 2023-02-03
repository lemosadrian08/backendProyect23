const { Schema } = require('mongoose')


const cartsSchema = new Schema({
    productsInCart : [{
        productId: { type: Schema.Types.ObjectId, ref:'products'},
        quantity: { type: Number},
    }],
    timestamp: { type: String, default: new Date().toLocaleString() },
})

module.exports = cartsSchema