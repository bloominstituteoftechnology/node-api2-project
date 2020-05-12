const express = require("express");
const server = express();

const router = require("./expressRouter")

server.use(express.json());

server.listen(8000, () => console.log("server running on port 8000"));