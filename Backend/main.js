const startDb = require ("./config/db.js")
const userRouter = require ("./modules/users/users.route.js")
const routerPost = require ("./modules/posts/posts.route.js")
const cors = require ("cors")

const express = require ("express")
const server = express()
const PORT = 9999 

server.use(express.json()) 
server.use(cors())

server.use("/users" , userRouter)
server.use("/posts", routerPost)



startDb(PORT, server)