const postsControllers = require("./posts.controllers.js")
const express = require ("express")
const postsSchema = require("./posts.schema.js")
const post = express.Router()
const upload = require("../../config/multer.js")

post.get("/" , postsControllers.getPosts) 
post.get("/:id" , postsControllers.getPost)
post.post("/" , postsControllers.createPost)

post.patch("/:id/cover", upload.single("cover"), postsControllers.uploadCover)

post.put("/:id", postsControllers.upDatePost)

post.delete("/:id", postsControllers.deletePost)

module.exports = post