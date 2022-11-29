const mongoose = require('mongoose')

let Schema = mongoose.Schema
const UserSchema = new Schema(
    {
        FullName: {
            type: String,
            required: true,
        },
        Organization: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        userType: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
