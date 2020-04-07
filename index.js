const express = require('express');

const hubsRouter = require("./hubs/router.js");

const server = express();

server.use(express.json());
server.use("/api/hubs", hubsRouter );

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});


server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
