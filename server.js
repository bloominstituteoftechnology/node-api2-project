require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./Routes/routes');

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
    res.status(200).send("Server is up and running!");
});

server.use("/api/posts", routes);

module.exports = server;

