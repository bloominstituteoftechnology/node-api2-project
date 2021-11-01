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
      return post === undefined || post === null
        ? res
            .status(400)
            .send({ message: "The post with the specified ID does not exist" })
        : res.status(200).send(post);
    })
    .catch(() => {
      res
        .status(500)
        .send({ message: "The post information could not be retrieved" });
    });
});

server.post("/", (req, res) => {
  const post = req.body;
  if (!post.title || !post.contents) {
    res
      .status(400)
      .send({ message: "Please provide title and contents for the post" });
  } else {
    model
      .insert(post)
      .then(() => res.status(201).send(post))
      .catch(() => {
        res.status(500).send({
          message: "There was an error while saving the post to the database",
        });
      });
  }
});

server.put(`/:id`, (req, res) => {
  const id = req.params.id;
  const post = req.body;
  if (!post.title || !post.contents) {
    res
      .status(400)
      .send({ message: "Please provide title and contents for the post" });
  } else {
    model
      .update(id, post)
      .then((updatedPost) => {
        return updatedPost === undefined ||
          updatedPost === null ||
          updatedPost === 0
          ? res.status(400).send({
              message: "The post with the specified ID does not exist",
            })
          : res.status(200).send(post);
      })
      .catch(() => {
        res
          .sendStatus(500)
          .send({ message: "The post information could not be modified" });
      });
  }
});

server.delete(`/:id`, (req, res) => {
  const id = req.params.id;
  model
    .remove(id)
    .then((removedPost) => {
      return removedPost === undefined ||
        removedPost === null ||
        removedPost === 0
        ? res
            .status(400)
            .send({ message: "The post with the specified ID does not exist" })
        : res.status(200).send("Post removed");
    })
    .catch(() => {
      res.status(500).send({ message: "The post could not be removed" });
    });
});

server.get(`/:id/comments`, (req, res) => {
  const id = req.params.id;
  model
    .findPostComments(id)
    .then((data) => res.status(200).send(data))
    .catch(() => {
      res
        .status(500)
        .send({ message: "The comments information could not be retrieved" });
    });
});

module.exports = server;
