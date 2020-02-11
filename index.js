const express = require('express');

const apiRouter = require("./api/apirouter.js");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api", apiRouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>This is one awesome home page!</h>
    <p>Gotta love that home page, amirite?</p>
  `);
});

const port = 5000;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
