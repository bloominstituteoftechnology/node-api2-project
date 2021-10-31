// implement your server here
// require your posts router and connect it here
const express = require("express");

const server = express();

const POST_URL = "/api/posts";

server.get(POST_URL, (req, res) => {
  res.send(`GET response ${POST_URL}`);
});

server.get(`${POST_URL}/:id`, (req, res) => {
  res.send(`GET response ${POST_URL}/:id`);
});

server.post(POST_URL, (req, res) => {
  res.send(`POST response ${POST_URL}`);
});

server.put(`${POST_URL}/:id`, (req, res) => {
  res.send(`PUT response ${POST_URL}/:id`);
});

server.delete(`${POST_URL}/:id`, (req, res) => {
  res.send(`DELETE response ${POST_URL}/:id`);
});

server.get(`${POST_URL}/:id/comments`, (req, res) => {
  res.send(`GET response ${POST_URL}/:id/comments`);
});

module.exports = server;
