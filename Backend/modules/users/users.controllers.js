const userService = require("./users.service.js")

const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers()
        res.status(200).json(users)
    } catch (error) {
        //res.status(500).json({message: error.message})
        console.log(error)
    }
}

const getUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id)
        if (!user) {
            console.log("ERRORE 404 : Utente non trovato!")
        }
        res.status(200).json(user)
    } catch (error) {
        //res.status(500).json({message: error.message})
        console.log(error)
    }
}

const createUser = async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body)
        res.status(201).json(newUser)
    } catch (error) {
        console.log("ERRORE 400 : Errore nel salvataggio ")
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
}