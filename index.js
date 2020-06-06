const express = require("express");
const welcomeRouter = require("./data/users/welcome/welcome-router");
const postsRouter = require("./data/users/posts-router")

const server = express();
const port = 4000;

server.use(express.json());
server.use(welcomeRouter);
server.use(postsRouter)

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
