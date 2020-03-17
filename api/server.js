const express = require("express");
const expressRouter = require("../express_router");
const server = express();


server.use(express.json());
server.use("/api/posts", expressRouter);
server.get('/', (req, res)=>{
    res.send("We are receiving data");
})

module.exports = server;