const express= require("express");
const postRouter=require("./data/posts/posts-router");

const server=express();
const port =4000;

server.use(express.json())
server.use(postRouter)

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})