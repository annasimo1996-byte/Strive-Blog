const jwt = require("jsonwebtoken");
const UserService = require("../../modules/users/users.service.js");

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Fornisci un token di autenticazione valido (Bearer token)"
            });
        }

        const token = authHeader.split(" ")[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const currentUser = await UserService.getUserById(decodedToken.id)

        if (!currentUser) {
            return res.status(401).json({
                message: "Utente non trovato nel sistema"
            });
        }
        
        req.user = currentUser
        next()
    } catch (e) {
        return res.status(401)
            .json({
                message: "Token not valid"
            })
    }
};

module.exports = authMiddleware