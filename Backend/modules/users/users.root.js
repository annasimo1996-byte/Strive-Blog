const usersControllers = require("./users.controllers.js")
const express = require ("express")
const router = express.Router()

router.get("/" , usersControllers.getUsers) 
router.get("/:id" , usersControllers.getUser)
router.post("/" , usersControllers.createUser)

module.exports = router