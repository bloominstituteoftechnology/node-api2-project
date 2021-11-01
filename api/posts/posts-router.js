// implement your posts router here
const express = require("express");

const server = express();
const model = require("./posts-model");

server.get("/", async (req, res) => {
  try {
    const posts = await model.find();
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

server.get(`/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const post = await model.findById(id)
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send({error: err})
  }
});

server.post("/", (req, res) => {
  res.status(201).send(`POST response `);
});

server.put(`/:id`, (req, res) => {
  res.status(200).send(`PUT response /:id`);
});

server.delete(`/:id`, (req, res) => {
  res.status(200).send(`DELETE response /:id`);
});

server.get(`/:id/comments`, (req, res) => {
  res.status(200).send(`GET response /:id/comments`);
});

module.exports = server;
