const express = require("express");
const cors = require("cors");
const db =require("./data/db");
const postRouter = require("./data/post-routers/PostRouter");

const server = express()
const port = 4000

server.use(express.json())
server.use(cors())
server.use("/api/posts", postRouter)



server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})