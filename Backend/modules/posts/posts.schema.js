const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        comment: { type: String, required: true }
    },
    { timestamps: true } 
)

const postsSchema = new mongoose.Schema(
    {
        category: { type: String, required: true },
        title: { type: String, required: true },
        cover: { type: String, required: true, default: "https://picsum.photos/1000/300" },
        readTime: {
            value: { type: Number, required: true },
            unit: { type: String, required: true }
        },
        author: {
            name: { type: String, required: true },
            avatar: { type: String, required: true }
        },
        content: { type: String, required: true },
        
        comments: [commentSchema] 
    },
    {
        timestamps: true,
        strict: true,
    }
)

module.exports = mongoose.model("post", postsSchema)