const postService = require("./posts.service.js")
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

const uploadCover = async (req, res) => {
    try {
        const coverUrl = await cloudinaryUpload(req.file, "cover")
        const coverUpDate = await postService.upDatePostCover(req.params.id, coverUrl)
        if (!updatedPost) return res.status(404).json({ message: "Post non trovato" })
        res.status(200).json(updatedPost)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
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
        const newPost = await postService.createPost(req.body);
        return res.status(201).json(newPost);
    } catch (error) {
        console.error("ERRORE 400 : Errore nel salvataggio ", error);
        return res.status(400).json({
            message: "Impossibile creare il post. Controlla i dati inseriti.",
            error: error.message
        });
    }
};

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

//FUNZIONI DEI COMMENTI
const getComments = async (req, res) => {
    try {
        const comments = await postService.getCommentsByPostId(req.params.id);
        if (!comments) return res.status(404).json({ message: "Post non trovato" });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getComment = async (req, res) => {
    try {
        const comment = await postService.getCommentById(req.params.id, req.params.commentId);
        if (!comment) return res.status(404).json({ message: "Commento o Post non trovato" });
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addComment = async (req, res) => {
    try {
        const updatedPost = await postService.addCommentToPost(req.params.id, req.body);
        if (!updatedPost) return res.status(404).json({ message: "Post non trovato" });
        // Restituiamo l'array aggiornato dei commenti
        res.status(201).json(updatedPost.comments);
    } catch (error) {
        res.status(400).json({ message: "Impossibile salvare il commento", error: error.message });
    }
}

const updateComment = async (req, res) => {
    try {
        const updatedPost = await postService.updateCommentInPost(req.params.id, req.params.commentId, req.body);
        if (!updatedPost) return res.status(404).json({ message: "Post o commento non trovato" });
        res.status(200).json(updatedPost.comments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteComment = async (req, res) => {
    try {
        const updatedPost = await postService.deleteCommentFromPost(req.params.id, req.params.commentId);
        if (!updatedPost) return res.status(404).json({ message: "Post non trovato" });
        res.status(200).json({ message: "Commento eliminato con successo", comments: updatedPost.comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    uploadCover,
    upDatePost,
    deletePost,
    getComments,
    getComment,
    addComment,
    updateComment,
    deleteComment
}