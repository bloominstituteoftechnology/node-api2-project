// implement your server here
// require your posts router and connect it here
const express = require("express");
const postRouter = require("./posts/posts-router");
const server = express();
server.use(express.json()); // teaches express to read req.body as JSON
server.use("/api/posts", postRouter);

// server.get("/", (req, res) => {
//   res.send(`
//     <h2>api works </h>
//   `);
// });

module.exports = server;
