const express = require("express");
const lambdaRouter = require("../data/data-router.js");

const server = express();

server.get("/", (req, res) => {
	res.send(`<h2>Server Running. API responding</h2>`);
});

server.use("/api/posts", lambdaRouter);

module.exports = server;
