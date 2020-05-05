const express = require('express');

const hubsRouter = require('./routers/post-router.js'); // <<added into index.js

const server = express();

server.use(express.json()) // needed to parse JSON from the body

// for URL's beginning with /api/hubs
server.use("/api/posts", hubsRouter);

server.get("/", (req, res) => {
    res.send(`
  <h2>Posts Api</h2>
  <p>Welcome to the LAMBDA POSTS API</p>
  `);
});

const port = 4000
server.listen(port, () => {
    console.log('\n*** Server Running on http://localhost:${port} ***\n');
});