const express = require('express');
const cors = require('cors');
const server = express();

const port = 5000;

server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).send(`<h1>Welcome to WebAPI-2</h1>`);
})

server.listen(port, () => console.log(`listening on port ${port}`));