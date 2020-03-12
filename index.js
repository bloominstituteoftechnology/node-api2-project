const express = require('express');
const server = express();
const port = process.env.PORT || 5000;
const postRoutes = require('./routes/postRoutes');
const commentsRoutes = require('./routes/commentsRoutes');

server.use(express.json());

server.use('/api/posts', postRoutes)

server.use('/api/comments', commentsRoutes)

server.use('/', (req, res) => {
    res.status(200).send('main route working');
})

server.listen(port, () => {
    console.log(`***listening on PORT${port}`);
})