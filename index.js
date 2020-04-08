const express = require("express");
const userRouter = require("./data/router.js");

const server = express();

server.use(express.json());

server.use("/api/posts", userRouter);


server.listen(4000, () => {
    console.log("Runing on http://localhost:4000")
}) 

