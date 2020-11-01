const express = require('express');
const postsRouter = require('./posts/posts-router');
const commentsRouter = require('./comments/comments-router');


const server = express();
 
const port = 5000;

server.use(express.json());
server.use(postsRouter);
server.use(commentsRouter);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})