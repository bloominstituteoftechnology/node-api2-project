// implement your posts router here
const express = require("express");

const server = express();
server.use(express.json());
const model = require("./posts-model");

server.get("/", (req, res) => {
  model
    .find()
    .then((posts) => res.send(posts))
    .catch(() => {
      res
        .status(500)
        .send({ message: "The posts information could not be retrieved" });
    });
});

server.get(`/:id`, (req, res) => {
  const id = req.params.id;
  model
    .findById(id)
    .then((post) => {
      if (post) {
        res.status(200).send(post);
      } else {
        res
          .status(400)
          .send({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(() => {
      res
        .status(500)
        .send({ message: "The post information could not be retrieved" });
    });
});

server.post("/", async (req, res) => {
  const post = req.body;
  if (!post.title || !post.contents) {
    res
      .status(400)
      .send({ message: "Please provide title and contents for the post" });
  } else {
    model
      .insert(post)
      .then((newPost) => res.status(201).send(newPost))
      .catch(() => {
        res.status(500).send({
          message: "There was an error while saving the post to the database",
        });
      });
  }
});

server.put(`/:id`, (req, res) => {
  const id = req.params.id;
  if (!req.body.title || !req.body.contents) {
    res
      .status(400)
      .send({ message: "Please provide title and contents for the post" });
  } else {
    const post = req.body;
    try {
      model.update(id, post);
      res.status(200).send(post);
    } catch (err) {
      res.status(500).send({
        message: { message: "The post information could not be modified" },
      });
    }
  }
});

server.delete(`/:id`, (req, res) => {
  const id = req.params.id;
  try {
    model.remove(id);
    res.status(200).send("record deleted");
  } catch (e) {
    res.status(500).send({ message: "The post could not be removed" });
  }
});

server.get(`/:id/comments`, (req, res) => {
  const id = req.params.id;
  try {
    const comments = model.findPostComments(id);
    res.status(200).send(comments);
  } catch (e) {
    res
      .status(500)
      .send({ message: "The comments information could not be retrieved" });
  }
});

module.exports = server;
