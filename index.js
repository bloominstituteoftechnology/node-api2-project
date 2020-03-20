require('dotenv').config();
const server = require('./server');
// // const server = require('express');
const port = process.env.PORT;

server.listen(port, () => {
  console.log(`server is running on http://localhost ${port}`);
});
