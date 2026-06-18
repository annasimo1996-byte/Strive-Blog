const express = require("express")
const passport = require("passport")
const authControllers = require("./auth.controllers.js")
const authMiddleware = require("../../middlewares/auth/authMiddleware.js")
const configurePassport = require("../../config/passport.js")
const authRouter = express.Router()

const checkGoogleOAuthConfig = (req, res, next) => {
    if (typeof configurePassport.isGoogleOAuthConfigured !== "function" || !configurePassport.isGoogleOAuthConfigured()) {
        return res.status(500).json({
            message: "Google OAuth non configurato: controlla GOOGLE_ID_CLIENT, GOOGLE_CLIENT_SECRET e GOOGLE_CALLBACK_URL nel file .env",
        })
    }
    next()
}

authRouter.post("/login", authControllers.login)

authRouter.get(
    "/google",
    checkGoogleOAuthConfig,
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    })
)

authRouter.get(
    "/google/callback",
    checkGoogleOAuthConfig,
    passport.authenticate("google", {
        session: false,
        failureRedirect: `http://localhost:3000/login?oauthError=google`,
    }),
    authControllers.googleCallback
)

authRouter.get("/me", authMiddleware, authControllers.getMe)

module.exports = authRouter
