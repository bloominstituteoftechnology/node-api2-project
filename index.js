const express = require('express');
const users = require('./data/db');
const server = express();
const postRoutes = require(./routes/postRoutes);
server.use(express.json());
server.use('/api/posts', postRoutes);
server.use('/', (req, res) => {res.send('The API is running.')});
const port = 5000;
server.listen(port, () => {
    console.log(`server is listening on port ${port}`)
});