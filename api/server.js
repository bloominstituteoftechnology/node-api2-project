// implement your server here
// require your posts router and connect it here
const express = require("express");
const postsRouter =  require('./posts/posts-router');
//const db = require("./users/model");

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use('/posts', postsRouter);

server.get("/", (req,res) => {
  res.json({message: "Hello!"});
});

module.exports = server; 