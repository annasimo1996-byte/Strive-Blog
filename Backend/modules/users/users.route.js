const usersControllers = require("./users.controllers.js")
const express = require ("express")
const usersSchema = require("./users.schema.js")
const userRouter = express.Router()

userRouter.get("/" , usersControllers.getUsers) 
userRouter.get("/:id" , usersControllers.getUser)
userRouter.post("/" , usersControllers.createUser)

userRouter.put("/:id", usersControllers.upDateUser)

userRouter.delete("/:id", usersControllers.deleteUser)

module.exports = userRouter