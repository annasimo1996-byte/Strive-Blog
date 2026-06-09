const postService = require("./posts.service.js")
const cloudinary = require("../../config/cloudinary.js")

const cloudinaryUpload = async (file, folder) => {
    if (!file) {
        throw new Error("Non hai caricato il file")
    }
    if (!file.mimetype) {
        throw new Error("Il file non è un immagine")
    }

    const fileUrl = `data: ${file.mimetype}; base64, ${file.buffer.toString("base64")}`
    const uploadImg = await cloudinary.uploader.upload(fileUrl, { folder })
}

const uploadCover = async (req, res) => {
    try {
        const coverUrl = await cloudinaryUpload(req.file, "cover")
        const coverUpDate = await postService.upDatePostCover(req.params.id, coverUrl)

    } catch (err) {
        console.error(err)
    }
}

const getPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const posts = await postService.getAllPosts(page, limit)
        res.status(200).json(posts)
    } catch (error) {
        //res.status(500).json({message: error.message})
        console.error(error)
    }
}

const getPost = async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.id)
        if (!post) {
            console.log("ERRORE 404 : Post non trovato!")
        }
        res.status(200).json(post)
    } catch (error) {
        //res.status(500).json({message: error.message})
        console.log(error)
    }
}

const createPost = async (req, res) => {
    try {
        const newPost = await postService.createPost(req.body)
        res.status(201).json(newPost)
    } catch (error) {
        console.log("ERRORE 400 : Errore nel salvataggio ", error)
    }
}

const upDatePost = async (req, res) => {
    try {
        const updatedPost = await postService.upDatePost(req.params.id, req.body)
        res.status(201).json(updatedPost)
    } catch (error) {
        console.log("ERRORE 400 : Errore nel salvataggio ")
    }
}

const deletePost = async (req, res) => {
    try {
        const deletedPost = await postService.deletePost(req.params.id)
        if (!deletedPost) {
            return res.status(404).json({
                message: "Post non trovato"
            })
        }
        res.status(200).json({
            message: "Post eliminato"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    uploadCover,
    upDatePost,
    deletePost,
}