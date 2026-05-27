const startDb = require ("./confing/db.js")
const router = require ("./modules/users/users.root.js")

const express = require ("express")
const server = express()
const PORT = 9999 

server.use(express.json()) 

server.use("/users" , router)

startDb(PORT, server)