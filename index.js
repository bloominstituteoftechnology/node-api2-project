const express = require('express');

const apiRouter = require('./api/api-router');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Messages Hubs API</h2>`);
});

server.use('/api', apiRouter);

const port = 5000;
server.listen(port, () => console.log('localhost:5000 is up and running big boy!!'));
