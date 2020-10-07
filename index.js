const express = require('express');

const port = 5000;

const posts = require('./posts/posts-router')
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
	res.json({
		message: "Welcome to our API",
	})
})


server.use('/', posts)

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})