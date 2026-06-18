const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const usersService = require("../users/users.service")

const createAccessToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("Errore di configurazione del server: JWT_SECRET non è definito nel file .env");
    }

    return jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
}

const login = async (email, password) => {

    const foundUser = await usersService.getUserByEmailAndPassword(email)

    if (!foundUser) {
        throw new Error("Credenziali non valide")
    }

    const isPasswordCorrect = await foundUser.comparePassword(password)

    if (!isPasswordCorrect) {
        throw new Error("Credenziali non valide")
    }

    const token = createAccessToken(foundUser)


    return { accessToken: token }
}

const findOrCreateGoogleUser = async (userData) => {

    const email = userData.emails?.[0]?.value
if (!email) {
        throw new Error("Impossibile registrarsi: l'account Google non fornisce un'email pubblica valida.");
    }

    const findEmail = await usersService.getUserByEmail(email)

   if (findEmail) {
       
        if (!findEmail.googleID) {
            return await usersService.upDateUser(findEmail._id, { googleID: userData.id })
        }
       
        return findEmail
    }

    const displayName = userData.displayName || "Utente Google";
    const nameParts = displayName.split(" ");

    const newUser = {
        name: userData.name?.givenName || nameParts[0] || "Utente",
        lastname: userData.name?.familyName || nameParts.slice(1).join(" ") || "Google",
        email: email,
        googleID: userData.id,
        avatar: userData.photos?.[0]?.value || "https://picsum.photos/200",
        
    }
    return await usersService.createUser(newUser)
}

module.exports = {
    login,
    findOrCreateGoogleUser,
    createAccessToken,
}
