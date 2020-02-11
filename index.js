const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Messages Hubs API</h2>`);
});

const port = 5000;
server.listen(port, () => console.log('localhost:5000 is up and running big boy!!'));
