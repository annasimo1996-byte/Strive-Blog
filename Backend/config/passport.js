const passport = require("passport")
const googleStrategy = require("passport-google-oauth20").Strategy
const authService = require("../modules/auth/auth.service.js")

const isGoogleOAuthConfigured = () => {
    return Boolean(
        process.env.GOOGLE_ID_CLIENT &&
        process.env.GOOGLE_CLIENT_SECRET &&
        process.env.GOOGLE_CALLBACK_URL
    )
}

const configurePassport = () => {

    if (isGoogleOAuthConfigured()) {
        passport.use(
            new googleStrategy({
                clientID: process.env.GOOGLE_ID_CLIENT,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_CALLBACK_URL,
            }, async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = await authService.findOrCreateGoogleUser(profile);
                    done(null, user);
                } catch (error) {
                    done(error, null);
                }
            })
        );
        console.log("=== Google OAuth Strategy registrata con successo ===");
    } else {
        console.warn("=== ATTENZIONE: Google OAuth non configurato. Variabili .env mancanti ===");
    }
}


configurePassport.isGoogleOAuthConfigured = isGoogleOAuthConfigured;
module.exports = configurePassport;