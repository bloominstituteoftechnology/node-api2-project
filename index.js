const express = require("express"); // imports express
const postsRouter = require("./posts/router.js"); // import router file
const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter); // path that router will use

// test it by making a GET request to localhost:5000/api/posts

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Posts API</h>
    <p>Welcome to the Lambda Posts API</p>
  `);
});

server.listen(5000, () => {
  console.log("\n*** Server Running on http://localhost:5000 ***\n");
});
