const express = require('express');

const server = express();
const PORT = 8000;

server.get('/', (req, res) => {
  res.send('API up and running')
});

server.listen(PORT, () => {
  console.log(`\n API running on PORT ${PORT}\n`)
});