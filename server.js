const express = require('express');
const postsRouter = require('./postsRouter.js');

const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
	res.send('hello from node.js server.js file');
});

module.exports = server;
