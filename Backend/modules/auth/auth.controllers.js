const authService = require("./auth.service.js")

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Email e password sono obbligatorie" })
        }

        const result = await authService.login(email, password)
        res.status(200)
            .json(result)

    } catch (error) {
        res.status(401)
            .json({
                message: error.message
            })
    }
}

const getMe = async (req, res) => {
    res.status(200)
        .json(req.user)
}

const googleCallback = (req, res) => {
    const accessToken = authService.createAccessToken(req.user)
    const frontendUrl = "http://localhost:3000"

    res.redirect(`${frontendUrl}/login?token=${accessToken}`)
}

module.exports = {
    login,
    getMe,
    googleCallback
}

