const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: Buffer
    }
})

module.exports = Item = mongoose.model("items", ItemSchema)