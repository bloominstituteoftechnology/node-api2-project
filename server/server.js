const express = require('express');
const server = express();
const dbRouter = require('../data/db-router')
server.use(express.json());
// server.get('/', (req,res)=>{
//     res.send(`<h2>Server Working</h2>`);
// });
server.use('/api/posts',dbRouter);
module.exports = server