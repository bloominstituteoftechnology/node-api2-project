// implement your server here
const express = require("express")
const server = express();
// require your posts router and connect it here

server.use(express.json());


module.exports = server;