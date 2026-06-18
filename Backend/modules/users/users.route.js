const usersControllers = require("./users.controllers.js")
const express = require ("express")
const usersSchema = require("./users.schema.js")
const userRouter = express.Router()
const upload = require ("../../config/multer.js")
const authMiddleware = require("../../middlewares/auth/authMiddleware.js")

userRouter.get("/", authMiddleware, usersControllers.getUsers) 
userRouter.get("/:id", authMiddleware, usersControllers.getUser)

userRouter.post("/" , usersControllers.createUser)

userRouter.put("/:id", authMiddleware, usersControllers.upDateUser)

userRouter.delete("/:id", authMiddleware, usersControllers.deleteUser)

userRouter.patch("/:id/avatar", authMiddleware, upload.single("avatar"), usersControllers.avatarUpload)

module.exports = userRouter