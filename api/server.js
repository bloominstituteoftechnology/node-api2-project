// implement your server here
// require your posts router and connect it here



const express = require ('express');


const server = express();
const postsRouter= require('./posts/posts-router.js')



server.use(express.json());
server.use('./api/posts', postsRouter);






server.get('/', (req, res) => {
    console.log(req.query);
    res.send(`
    <h2>api2!</h2>
    <p>wohho</p>
    `);

});

module.exports = server;