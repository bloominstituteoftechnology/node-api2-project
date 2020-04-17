const express = require('express');

const postRoutes = require('./posts/postRoutes');
const server = express();
const PORT = 8000;

server.use(express.json());

server.use('/posts', postRoutes);

server.get('/', (req, res) => {
  res.send('API up and running')
});

server.listen(PORT, () => {
  console.log(`\n API running on PORT ${PORT}\n`)
});