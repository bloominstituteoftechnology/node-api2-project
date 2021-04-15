// require your server and launch it here\

require('dotenv').config()

const express = require('express');

const postRoutes = require("./api/posts/posts-router.js");

const server = express();


server.use('/api/posts', postRoutes);


const port = process.env.PORT;


server.listen(port, () => console.log(`API running on port ${port}`));