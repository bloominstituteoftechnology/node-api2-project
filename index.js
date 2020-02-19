//express import
const express = require('express');

//route imports
const postRoutes = require('./pots/postsRoute');

//server import
const server = express();

server.use(express.json());
server.use('/api/posts', postRoutes);

const port = 8080;
server.listen(port, () => {
	console.log(`API is running on port ${port}`);
});
