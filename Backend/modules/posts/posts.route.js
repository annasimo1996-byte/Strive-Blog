const postsControllers = require("./posts.controllers.js")
const express = require ("express")
const postsSchema = require("./posts.schema.js")
const post = express.Router()
const upload = require("../../config/multer.js")
const authMiddleware = require("../../middlewares/auth/authMiddleware.js")

//ROTTE DEI POST
post.get("/" , postsControllers.getPosts) 
post.get("/:id" , postsControllers.getPost)

post.post("/", authMiddleware, postsControllers.createPost)

post.patch("/:id/cover", authMiddleware, upload.single("cover"), postsControllers.uploadCover)

post.put("/:id", authMiddleware, postsControllers.upDatePost)

post.delete("/:id", authMiddleware, postsControllers.deletePost)

//ROTTE DEI COMMENTI
post.get("/:id/comments", postsControllers.getComments)
post.get("/:id/comments/:commentId", postsControllers.getComment)


post.post("/:id/comments", authMiddleware, postsControllers.addComment)

post.put("/:id/comment/:commentId", authMiddleware, postsControllers.updateComment)

post.delete("/:id/comment/:commentId", authMiddleware, postsControllers.deleteComment)

module.exports = post
