const mongoose = require("mongoose")
const connectString = process.env.MONGODB_CONNECT

const initDb = async () => {
    try {
        await mongoose.connect(connectString)
        console.log("Connessione effettuata")
    } catch (error) {
        console.error("Errore nella connessione :", error)
    }
}

const startDb = async (PORT, server) => {
    await initDb()
    server.listen(PORT, () =>{console.log("Server in esecuzione all'indirizzo localhost:" , PORT)})
}

module.exports = startDb 