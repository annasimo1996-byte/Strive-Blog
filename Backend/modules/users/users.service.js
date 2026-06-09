const user = require("./users.schema.js")

const getAllUsers = async (page = 1, limit = 5) => {
    const skip = (page-1) * limit
    const users = await user.find().skip(skip).limit(limit)
    const total = await user.countDocuments()
    return {
        data : users,
        page,
        limit,
        total,
        totalPages : Math.ceil(total / limit)
    }
}

const getUserById = async (id) => {
    return await user.findById(id)
}

const createUser = async (userData) => {
    const newUser = new user(userData)
    return await newUser.save()
}

const upDateUser = async (id, body) =>{
    return await user.findByIdAndUpdate(id, body, {new:true})
}

const upDateUserAvatar = async(id, avatarUrl)=>{
    return await user.findByIdAndUpdate(id, {avatar : avatarUrl}, {new:true})
}

const deleteUser = async (id) =>{
    return await user.findByIdAndDelete(id)
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    upDateUser,
    upDateUserAvatar,
    deleteUser
}