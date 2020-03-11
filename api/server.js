const express = require('express');
const server = express();
server.use(express.json());
const dbRouter = require("../router/db-router")

// server.get('/', (req, res) => {
//     const query = req.query;
//     console.log (query)
//     res.status(200).json(query);
// });
server.get('/', (req, res) => {
	res.status(200).send('Node API 2 Afternoon Project');
});

server.use("/api/posts", dbRouter)
module.exports = server;
