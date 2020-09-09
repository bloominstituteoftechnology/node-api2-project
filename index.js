const express = require('express');
// const Hubs = require('./hubs/hubs-model.js');
const server = express();
const postRouter = require('./routers/post-router.js')

server.use(express.json());