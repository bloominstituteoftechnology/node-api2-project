const express = require('express');

const postsRouter = require("./posts/router.js");

const server = express();

server.use(express.json());
server.use("/api/posts", postsRouter );

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Posts API</h>
    <p>Welcome to the Lambda Posts API</p>
  `);
});


server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
