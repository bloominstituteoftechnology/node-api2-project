const express = require("express");

const postRouter = require('./posts/posts-router'); // << added

const server = express();

const router = express.Router();

server.use(express.json()); 

// for URLs beginning with /api/posts
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Posts API</h>
    <p>Welcome to the Lambda Posts API</p>
  `);
});

const port = 5000;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
