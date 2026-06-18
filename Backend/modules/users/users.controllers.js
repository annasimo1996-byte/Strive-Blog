const userService = require("./users.service.js")
const cloudinary = require("../../config/cloudinary.js")

const cloudinaryUpload = async (file, folder) => {
    if (!file) {
        throw new Error("Non hai caricato il file")
    }
    if (!file.mimetype.startsWith("image/")) {
        throw new Error("Il file non è un'immagine")
    }

    const fileUrl = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
    const uploadImg = await cloudinary.uploader.upload(fileUrl, { folder })
    return uploadImg.secure_url
}

const avatarUpload = async (req, res) => {
    try {
        const avatarUrl = await cloudinaryUpload(req.file, "avatar")
        const avatarUpDate = await userService.upDateUserAvatar(req.params.id, avatarUrl)
        if (!avatarUpDate) return res.status(404).json({ message: "Avatar non trovato" })
        res.status(200).json(avatarUpDate)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}

const getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const users = await userService.getAllUsers(page, limit)
        res.status(200).json(users)
    } catch (error) {
        //res.status(500).json({message: error.message})
        console.error(error)
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
        const userResponse = newUser.toObject()
        delete userResponse.password

        res.status(201).json(userResponse)

    } catch (error) {
        console.log("ERRORE 400 : Errore nel salvataggio ", error)
        return res.status(400).json({
            message: "Impossibile creare l'utente. Verifica i dati inseriti o se l'email esiste già.",
            error: error.message
        })
    }
}

const upDateUser = async (req, res) => {
    try {
        const updatedUser = await userService.upDateUser(req.params.id, req.body)
        res.status(201).json(updatedUser)
    } catch (error) {
        console.log("ERRORE 400 : Errore nel salvataggio ")
    }
}

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userService.deleteUser(req.params.id)
        if (!deletedUser) {
            return res.status(404).json({
                message: "Utente non trovato"
            })
        }
        res.status(200).json({
            message: "Utente eliminato"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    upDateUser,
    deleteUser,
    avatarUpload
}