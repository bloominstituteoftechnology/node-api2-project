const port = 8080;
const express = require('express');
const postsRouter = require('./postsRouter');
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.send("Server is working");
});

server.use('/api/posts', postsRouter);
module.exports = server; 

server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
}); 