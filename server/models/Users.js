const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        phone_number: {
            type: Number,
        },
        access_code: {
            type: String,
            required: true,
        },
        password: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        initialized: {
            type: Boolean,
            default: false
        }
})

module.exports = User = mongoose.model("users", UserSchema)