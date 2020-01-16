const express = require("express");

const postRouter = require("./data/posts/postRouter.js");

const server = express();
server.use(express.json());
server.get("/", (req, res) => {
  res.send("<h1>Greetings<h1>");
});

server.use("/api/posts", postRouter);
const port = 8000;

server.listen(port, () => console.log(`\n ** api on port: ${port} **`));
