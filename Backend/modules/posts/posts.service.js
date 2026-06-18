const post = require("./posts.schema.js")

const getAllPosts = async (page = 1, limit = 5) => {
    const skip = (page-1) * limit
    const posts = await post.find().skip(skip).limit(limit)
    const total = await post.countDocuments()
    return {
        data : posts,
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
const upDatePostCover = async (id, coverUrl)=>{
    return await post.findByIdAndUpdate(id, {cover: coverUrl}, {new : true})
}

const deletePost = async (id) =>{
    return await post.findByIdAndDelete(id)
}


//FUNZIONI DEI COMMENTI
const getCommentsByPostId = async (postId) => {
    const foundPost = await post.findById(postId);
    return foundPost ? foundPost.comments : null;
}

const getCommentById = async (postId, commentId) => {
    const foundPost = await post.findById(postId);
    if (!foundPost) return null;
    return foundPost.comments.id(commentId);
}


const addCommentToPost = async (postId, commentData) => {
    return await post.findByIdAndUpdate(
        postId,
        { $push: { comments: commentData } },
        { new: true, runValidators: true }
    );
}

const updateCommentInPost = async (postId, commentId, updatedData) => {
    return await post.findOneAndUpdate(
        { _id: postId, "comments._id": commentId },
        { 
            $set: { 
                "comments.$.name": updatedData.name,
                "comments.$.comment": updatedData.comment
            } 
        },
        { new: true }
    );
}


const deleteCommentFromPost = async (postId, commentId) => {
    return await post.findByIdAndUpdate(
        postId,
        { $pull: { comments: { _id: commentId } } },
        { new: true }
    );
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    upDatePost,
    upDatePostCover,
    deletePost,
    getCommentsByPostId,
    getCommentById,
    addCommentToPost,
    updateCommentInPost,
    deleteCommentFromPost
}