// require your server and launch it here

const express = require('express');

const postRoutes = require("./api/posts/posts-router.js");

const server = express();


server.use('/api/posts', postRoutes);


server.listen(8000, () => console.log('API running on port 8000'));