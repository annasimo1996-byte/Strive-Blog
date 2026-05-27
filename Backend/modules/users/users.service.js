const user = require("./users.schema.js")

const getAllUsers = async () => {
    return await user.find()
}

const getUserById = async (id) => {
    return await user.findById(id)
}

const createUser = async (userData) => {
    const newUser = new user(userData)
    return await newUser.save()
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
}