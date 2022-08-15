const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone_number: {
            type: Number,
            required: true
        },
        access_code: {
            type: String,
            required: true,
        },
        password: {
            type: String
        }
})

module.exports = User = mongoose.model("users", UserSchema)