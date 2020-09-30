const express = require("express");
const router = require("./router/router.js");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});


server.use("/api/posts", router);

const port = 8000;
server.listen(port, () => console.log("server running..."));