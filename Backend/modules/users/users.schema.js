const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        birthData: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamps : true,
        strict : true,
    }
) 

module.exports = mongoose.model("user", usersSchema)