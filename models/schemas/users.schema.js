const { Schema } = require('mongoose')

const usersSchema = new Schema({
    email: {type:String, required:true, unique: true},
    password: { type: String, required: true },
    fullName:{ type: String, required: true },
    address: { type: String, required: true },
    phoneNumber:{ type: String, required: true },
    age: { type: String, required: true },
    image: { type: String },
    cart: { type: Schema.Types.ObjectId , ref: 'carts'},
    timestamp: { type: String, default: new Date().toLocaleString() }
})

module.exports = usersSchema