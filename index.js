const express = require("express");
const postRouter = require("./blog/post-Router");
const port = 4000;
const server = express();

server.use(express.json());
server.use("/api/posts", postRouter);

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});