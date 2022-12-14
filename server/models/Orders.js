const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    items: {
        type: [String],
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    item_names : {
        type: [String],
        required: true
    }
})

module.exports = Order = mongoose.model("orders", OrderSchema)