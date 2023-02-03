const { Schema } = require('mongoose')

const productsSchema = new Schema({
  name: { type: String },
  description: { type: String },
  code: { type: String },
  price: { type: String },
  img: { type: String },
  timestamp: { type: String, default: new Date().toLocaleString()}
})

module.exports = productsSchema
