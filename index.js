const express = require('express');

const server = express();

server.use(express.json());

const postsRouter = require('./data/router.js');

server.use('/api/posts', postsRouter);

server.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
})