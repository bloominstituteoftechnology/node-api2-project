const express = require('express');

const dataRouter = require('./routers/data-router.js');

const server = express();

server.use(express.json());

server.use('/api/posts', dataRouter);

server.get('/', (req, res) => {
    res.send(`
        <h2>Lambda Blog</h2>
        <h4>Welcome to the Lambda Blog API</h4>
        <p>Please enjoy this assortment of posts and comments!</p>
    `);
});

const port = 5000;
server.listen(port, () => {
    console.log(`Yay! The server is running on port ${port}!`)
})