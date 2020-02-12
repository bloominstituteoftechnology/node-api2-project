const express = require("express");

const apiRouter = require("./api/api-router.js");

const server = express();

// Need for POST / PUT events to parse JSON from the body
server.use(express.json());

// For URL's beginning with /api
server.use("/api", apiRouter);

server.get("/", (req, res) => {
    res.send(`
        <h1>Here's My API</h1>
        `);
});

const port = 5000;
server.listen(port, () => {
    console.log(`\n *** Server Running on http://localhost ${port} *** \n`);
});