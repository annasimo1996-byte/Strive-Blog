require("dotenv/config")
const startDb = require ("./config/db.js")
const userRouter = require ("./modules/users/users.route.js")
const routerPost = require ("./modules/posts/posts.route.js")
const cors = require ("cors")

const express = require ("express")
const server = express()

const PORT = process.env.PORT
server.use(express.json()) 
server.use(cors())

server.use("/users" , userRouter)
server.use("/blogPosts", routerPost)



startDb(PORT, server)