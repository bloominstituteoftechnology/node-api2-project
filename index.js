const express = require("express")
const postRouter = require("./posts/post-router")
// const welcomeRouter = require("./welcome/welcome-router")

const server = express()
const port = 4000

server.use(express.json())
server.use(postRouter)
// server.use(welcomeRouter)

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})