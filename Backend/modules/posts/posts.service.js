const post = require("./posts.schema.js")

const getAllPosts = async (page = 1, limit = 5) => {
    const skip = (page-1) * limit
    const posts = await post.find().skip(skip).limit(limit)
    const total = await post.countDocuments()
    return {
        data : post,
        page,
        limit,
        total,
        totalPages : Math.ceil(total / limit)
    }
}

const getPostById = async (id) => {
    return await post.findById(id)
}

const createPost = async (postData) => {
    const newPost = new post(postData)
    return await newPost.save()
}

const upDatePost = async (id, body) =>{
    return await post.findByIdAndUpdate(id, body, {new:true})
}

const deletePost = async (id) =>{
    return await post.findByIdAndDelete(id)
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    upDatePost,
    deletePost
}