const multer = require("multer")

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1920 * 1920,
    }
})

module.exports = upload