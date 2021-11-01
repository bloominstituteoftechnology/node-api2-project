// implement your posts router here
const express = require("express");

const server = express();
server.use(express.json());
const model = require("./posts-model");

server.get("/", async (req, res) => {
  try {
    const posts = await model.find();
    res.status(200).send(posts);
  } catch (e) {
    res
      .status(500)
      .send({ message: "The posts information could not be retrieved" });
  }
});

server.get(`/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const post = await model.findById(id);
    res.status(200).send(post);
  } catch (e) {
    res
      .status(500)
      .send({ message: "The post with the specified ID does not exist" });
  }
});

server.post("/", async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res
      .status(400)
      .send({ message: "Please provide title and contents for the post" });
  } else {
    const post = req.body;
    try {
      model.insert(post);
      res.status(201).send(post)
    } catch (err) {
      res.status(500).send({
        message: "There was an error while saving the post to the database",
      });
    }
  }
});

server.put(`/:id`, (req, res) => {
  res.status(200).send(`PUT response /:id`);
});

server.delete(`/:id`, (req, res) => {
  const id = req.params.id;
  try {
    model.remove(id);
    res.status(200).send('record deleted');
  } catch (e) {
    res
      .status(500)
      .send({ message: "The post could not be removed" });
  }
});

server.get(`/:id/comments`, (req, res) => {
  res.status(200).send(`GET response /:id/comments`);
});

module.exports = server;
