const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        lastname: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        birthData: {
            type: String,
            require: true,
        },
        avatar: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        }
    },
    {
        timestamps : true,
        strict : true,
    }
) 

module.exports = mongoose.model("user", usersSchema)