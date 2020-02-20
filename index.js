//express import
const express = require('express');

const cors = require('cors');
//route imports
const postRoutes = require('./pots/postsRoute');

//server import
const server = express();

server.use(express.json());
server.use((req, res, next) => {
	console.log(req.headers);
	next();
});
server.use(cors());
server.use((req, res, next) => {
	console.log(req.headers);
	next();
});
server.use('/api/posts', postRoutes);

const port = 8080;
server.listen(port, () => {
	console.log(`API is running on port ${port}`);
});
