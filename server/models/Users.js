const mongoose = require('mongoose')

function isInitialized(){
    return this.initialized;
}
const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        phone_number: {
            type: Number,
            required: isInitialized()
        },
        access_code: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: isInitialized()
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        initialized: {
            type: Boolean,
            default: false
        },
        address: {
            type: String,
            required: isInitialized()
        }
})

module.exports = User = mongoose.model("users", UserSchema)