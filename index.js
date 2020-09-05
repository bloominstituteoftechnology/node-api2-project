const express = require('express');
const postRoutes = require('./posts/postRoutes');

const port = 5000;
const server = express();

server.use('/api/posts', postRoutes);

server.use('/', (req, res) => res.send('API up and running!'));

server.listen(port, () => console.log(`Server running on port ${port}`));
