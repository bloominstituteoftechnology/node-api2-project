const express = require('express');
const server = express();
const postRoutes = require('./routes/postRoutes');
const port = 5000;
server.use(express.json());
server.use('/api/posts', postRoutes);
server.use('/', (req, res) => {res.send('The API is running.')});
server.listen(port, () => {
    console.log(`server is listening on port ${port}`)
});